---
id: "2026-08-27"
title: "ESP-IDF Bluetooth LE Tutorial"
description: "This tutorial covers how to use Bluetooth Low Energy (BLE) with your ESP32 (ESP-IDF)."
updated: "2026-08-28"
draft: true
tags: ["esp-idf", "ble", "nimble"]
---

This tutorial covers how to use Bluetooth Low Energy (BLE) with your ESP32 (ESP-IDF). It's based on the official documentation by Espressif Systems, which you can [view here](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/ble/get-started/ble-introduction.html).

This is a step-by-step tutorial, focusing on the implementation rather than every single detail. So you can follow along from the beginning to the end. Let's start!

## Enabling BLE in ESP-IDF

Before you can use BLE, you have to enable it using Menuconfig. There are two ways to do this.

### Option 1: Using the VS Code Command Palette

> **Warning:** Only follow this method if you are developing using the ESP-IDF VS Code extension.

1. Click `Ctrl + Shift + P` to open the command palette.
2. Search for and select `ESP-IDF: SDK Configuration Editor (Menuconfig)`.
3. Navigate to `Component Config -> Bluetooth`.
4. Check the Bluetooth box and select `NimBLE - BLE only` from the Host selector, like this:

![Image](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/nmh4adx074qycofljqsj.png)

### Option 2: Using the ESP-IDF terminal

1. Open the project configuration menu by running `idf.py menuconfig`
2. Navigate to `Component config -> Bluetooth`.
3. Enable Bluetooth by setting `Bluetooth` to `[x]` (enabled).
4. Select the host stack by navigating to `Host` and choosing `NimBLE - BLE only`.
5. Press `S` to save, then `Q` to quit.

## Updating `CMakeLists.txt`

You should add `PRIV_REQUIRES bt nvs_flash esp_driver_gpio` in your `CMakeLists.txt` inside `idf_component_register()`, since our program requires them.

## Including necessary headers

This program requires a lot of headers to be included. Update your `main.c` like this:

```c
/* Includes */
/* STD APIs */
#include <assert.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

/* ESP APIs */
#include "driver/gpio.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "sdkconfig.h"

/* FreeRTOS APIs */
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

/* NimBLE stack APIs */
#include "host/ble_hs.h"
#include "host/ble_uuid.h"
#include "host/util/util.h"
#include "nimble/ble.h"
#include "nimble/nimble_port.h"
#include "nimble/nimble_port_freertos.h"
#include "services/gap/ble_svc_gap.h"
#include "services/gatt/ble_svc_gatt.h"

/* Defines */
#define TAG "NimBLE_GATT_Server"
#define DEVICE_NAME "NimBLE_GATT"

void app_main(void) {

}
```

This is much cleaner than pasting everything in `main.c`. Change the `TAG` and `DEVICE_NAME` in `common.h` if required.

## Initialize NVS Flash (Non-Volatile Storage)

The BLE stack requires NVS flash to store configurations, so it should be initialized using `nvs_flash_init()`. Call it in the main function:

```c
void app_main(void) {
    nvs_flash_init();
}
```

This function returns a return code. If the return code is `0`, it means no errors. Any non-zero value means an error, and each value corresponds to a particular error. To make our code bulletproof, let's add some error handling:

```c
void app_main(void) {
  esp_err_t ret; // To store the return code

  ret = nvs_flash_init();
  if (ret == ESP_ERR_NVS_NO_FREE_PAGES ||
      ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
    ESP_ERROR_CHECK(nvs_flash_erase());
    ret = nvs_flash_init();
  }
  if (ret != ESP_OK) {
    ESP_LOGE(TAG, "failed to initialize nvs flash, error code: %d ", ret);
    return;
  }
}
```

### Tips for beginners

Here, `esp_err_t` is just an `int`, not some mysterious type. It's provided by `esp_err.h`, which we included in `common.h`. `esp_err_t` stands for "ESP Error Type". That alias was defined for code readability.

Similarly, `ESP_ERR_NVS_NO_FREE_PAGES`, `ESP_ERR_NVS_NEW_VERSION_FOUND`, etc. are also `int`s, which are defined in `nvs.h`. They are **preprocessor macros** defined using `#define`, which means they will be replaced with their actual values (`4365` and `4368` in this case) in the preprocessing step.

`ESP_LOGE` ("E" stands for "Error") is a function-like macro used to log errors. `ESP_LOGI` is used for logging "Info".

## Initialize GPIO2 output pin

Here, we are using GPIO2 because most ESP32s have an inbuilt LED for it.

```c
void app_main() {
    ...
    gpio_reset_pin(GPIO_NUM_2);
    gpio_set_direction(GPIO_NUM_2, GPIO_MODE_OUTPUT);
}
```

## Initialize NimBLE stack

Call `nimble_port_init()` to initialize NimBLE, the software stack we are using to manage BLE.

```c
void app_main(void) {
  ...
  ret = nimble_port_init();
  if (ret != ESP_OK) {
    ESP_LOGE(TAG, "failed to initialize nimble stack, error code: %d ", ret);
    return;
  }
}
```

Here, we are reusing the `ret` variable we created earlier.

## Initialize GAP

GAP stands for Generic Access Profile. Initializing it makes our ESP32 discoverable to other devices (e.g., our phone).

```c
void app_main(void) {
  ...
  BaseType_t rc = 0; // Still just an int; "rc" stands for "return code"

  ble_svc_gap_init();

  rc = ble_svc_gap_device_name_set(DEVICE_NAME);
  if (rc != 0) {
    ESP_LOGE(TAG, "failed to set device name to %s, error code: %d",
             DEVICE_NAME, rc);
    return;
  }
}
```

`DEVICE_NAME` is defined in `common.h`. You can change it if you want.

## Initialize the GATT profile

This is the hard part. GATT stands for Generic Attribute. It defines how two connected devices package, format, and send data using a structured hierarchy of services and characteristics.

A GATT profile has one or more services, which have one or more characteristics within them, which hold data and descriptors. Each service and characteristic has a UUID. Here is a diagram showing the GATT hierarchy (taken from the official docs):

![Image description](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/p4qb6fstiavmr69a7cwv.png)

For example, you can create a Heart Rate service that has a Heart Rate Measurement characteristic, which holds the value.

Before defining our services and characteristics, let's initialize GATT:

```c
void app_main(void) {
  ...
  ble_svc_gatt_init();
}
```

### Define GATT services table

Here is where we define which services and characteristics our ESP32 have which can be tweaked from our phone. Define these before (outside) the `app_main` function, but after the `#include`s:

```c
static const ble_uuid16_t auto_io_svc_uuid = BLE_UUID16_INIT(0x1815);
static const ble_uuid16_t led_chr_uuid = BLE_UUID16_INIT(0x2A56);

static uint16_t led_chr_val_handle;
static int led_chr_access(uint16_t conn_handle, uint16_t attr_handle,
                          struct ble_gatt_access_ctxt *ctxt, void *arg);


/* GATT services table */
static const struct ble_gatt_svc_def gatt_svr_svcs[] = {
    /* Automation IO service */
    {.type = BLE_GATT_SVC_TYPE_PRIMARY,
     .uuid = &auto_io_svc_uuid.u,
     .characteristics =
         (struct ble_gatt_chr_def[]){
             {/* LED characteristic */
              .uuid = &led_chr_uuid.u,
              .access_cb = led_chr_access,
              .flags = BLE_GATT_CHR_F_WRITE,
              .val_handle = &led_chr_val_handle},
             {
                 0, /* No more characteristics in this service. */
             }}},

    {
        0, /* No more services. */
    },
};
```

You might wonder why we used `0x1815` as the UUID of our Automation IO service and `0x2A56` as the UUID of our LED characteristic. These short UUIDs are standardized by the **Bluetooth SIG (Special Interest Group)**. Just like how the UNICODE value `U+1F60A` corresponds to the smiling face emoji (😊), `0x1815` corresponds to "Automation IO" and `0x2A56` corresponds to "Digital", meaning that any device that connects to our ESP32 will decide that this service is for pin control and I/O automation when it sees the UUID `0x1815`. There are even more such standardized UUIDs with their own specific meaning. You can check the Bluetooth SIG Official List for all assigned 16-bit and 32-bit UUIDs.

Later in this tutorial, we are going to connect your phone to your ESP32, and you will see our service listed as "Automation IO". So keep this in mind.

You can also use your own UUIDs instead of these standardized UUIDs, but make sure to use a 128bit UUID instead to make sure you don't accidentally use a standardized UUID, which can be misleading.

Here, `{0}` acts as the null terminator. It is required to denote the end of the array.

Now we have defined the services tables. Let's define the `led_chr_access` callback.

### Defining the Access Callback

The access callback function handles incoming requests from connected clients. Since we configured our LED characteristic with `BLE_GATT_CHR_F_WRITE`, NimBLE will invoke this function whenever a client (such as your phone) sends a write command.

Copy the following code below the GATT services table, but above the main function:

```c
static int led_chr_access(uint16_t conn_handle, uint16_t attr_handle,
                          struct ble_gatt_access_ctxt *ctxt, void *arg) {
    if (ctxt->op == BLE_GATT_ACCESS_OP_WRITE_CHR) {
        // Extract the incoming byte payload
        uint8_t val = ctxt->om->om_data[0];

        if (val == 1) {
            gpio_set_level(GPIO_NUM_2, 1);
            ESP_LOGI(TAG, "LED turned ON");
        } else if (val == 0) {
            gpio_set_level(GPIO_NUM_2, 0);
            ESP_LOGI(TAG, "LED turned OFF");
        } else {
            ESP_LOGW(TAG, "Invalid payload value received: %d", val);
        }
        return 0;
    }

    return BLE_ATT_ERR_UNLIKELY;
}
```

Here, `ctxt->op` indicates what operation triggered the callback. We check if it equals `BLE_GATT_ACCESS_OP_WRITE_CHR`. `ctxt->om` points to an `os_mbuf` buffer structure containing the received payload data. `ctxt->om->om_data[0]` reads the first byte. `gpio_set_level()` sets the voltage of GPIO pin 2, which corresponds to the built-in LED in most ESP32s. If you don't have it, you can change the pin or connect an external LED.

## Registering Services and Characteristics

Now that our GATT table and access callback are defined, we must register them with the NimBLE stack. Paste the following code in `app_main()`:

```c
void app_main(void) {
    ...
    ble_svc_gatt_init();

    int rc;
    rc = ble_gatts_count_cfg(gatt_svr_svcs);
    if (rc != 0) {
        ESP_LOGE(TAG, "failed to count gatt services, error code: %d", rc);
        return;
    }

    rc = ble_gatts_add_svcs(gatt_svr_svcs);
    if (rc != 0) {
        ESP_LOGE(TAG, "failed to add gatt services, error code: %d", rc);
        return;
    }
}
```

## Configuring Advertising

To enable smartphones or central devices to discover your ESP32, you must start advertising.

Define an `on_sync` callback function that executes automatically once NimBLE is synchronized and ready:

```c
static void gatt_svr_on_sync(void) {
    struct ble_hs_adv_fields fields;
    memset(&fields, 0, sizeof(fields));

    // Make device discoverable and broadcast the name
    fields.flags = BLE_HS_ADV_F_DISC_GEN | BLE_HS_ADV_F_BREDR_UNSUP;
    fields.name = (uint8_t *)DEVICE_NAME;
    fields.name_len = strlen(DEVICE_NAME);
    fields.name_is_complete = 1;

    int rc = ble_gap_adv_set_fields(&fields);
    if (rc != 0) {
        ESP_LOGE(TAG, "failed to set advertising data, error code: %d", rc);
        return;
    }

    // Configure advertising behavior
    struct ble_gap_adv_params adv_params;
    memset(&adv_params, 0, sizeof(adv_params));
    adv_params.conn_mode = BLE_GAP_CONN_MODE_UND; // Undirected connectable
    adv_params.disc_mode = BLE_GAP_DISC_MODE_GEN; // General discoverable

    rc = ble_gap_adv_start(BLE_OWN_ADDR_PUBLIC, NULL, BLE_HS_FOREVER,
                           &adv_params, NULL, NULL);
    if (rc != 0) {
        ESP_LOGE(TAG, "failed to start advertising, error code: %d", rc);
        return;
    }
    ESP_LOGI(TAG, "Advertising started successfully");
}
```

Now, assign the sync callback in the main function:

```c
void app_main(void) {
    ...
    ble_hs_cfg.sync_cb = gatt_svr_on_sync;
}

## Running the NimBLE Task

NimBLE operates asynchronously within its own FreeRTOS task context. Define a dedicated host task function:

```c
void nimble_host_task(void *param) {
    nimble_port_run(); // Runs continuously to handle stack events
    nimble_port_freertos_deinit();
}
```

Start the task from the main function:

```c
void app_main(void) {
    nimble_port_freertos_init(nimble_host_task);
}
```

Now you have done the coding part. Let's test your device!

## Testing Your ESP32 BLE Server

1. Build and flash the code to your phone.
2. Install nRF Connect on your mobile phone.
3. Enable Bluetooth on your phone and scan for nearby devices.
4. Select your ESP32 device using the designated name (e.g., `DEVICE_NAME`) and tap **Connect**.
5. Locate the **Automation IO** service (`0x1815`).
6. Select the **Digital** characteristic (`0x2A56`) and tap the Write action.
7. Send a payload byte of `01` (HEX) to turn GPIO2 High (LED ON), or send `00` (HEX) to switch it Low (LED OFF).
