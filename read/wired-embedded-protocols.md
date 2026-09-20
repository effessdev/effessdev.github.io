---
title: "Wired Embedded Protocols (UART, I2C, SPI, and CAN): A Practical Guide"
description: "A practical guide to the four most common wired embedded protocols—UART, I2C, SPI, and CAN—covering how each works, when to use it, and Arduino code examples."
updated: "2026-09-20"
featured: false
draft: false
aiGenerated: true
tags: ["embedded", "arduino", "protocols"]
---

Embedded systems rarely operate in isolation. Whether you're reading a temperature sensor, logging data to an SD card, or coordinating multiple microcontrollers, you need a reliable way for chips to talk to each other. While wireless protocols like Wi-Fi and Bluetooth get plenty of attention, the workhorses of embedded communication are the wired protocols: **UART, I2C, SPI, and CAN**.

This guide covers the fundamentals of each, when to use them, and practical Arduino code to get started.

---

## UART (Universal Asynchronous Receiver/Transmitter)

UART is the simplest and most ubiquitous serial communication protocol. It's **asynchronous**, meaning there's no shared clock signal between devices—both sides must agree on a baud rate in advance.

**How it works:** UART uses two lines: TX (transmit) and RX (receive). Data is sent in frames consisting of a start bit, 5–9 data bits (typically 8), an optional parity bit, and one or two stop bits. The start and stop bits frame each byte, allowing the receiver to synchronize without a clock line.

**Key characteristics:**

- **Topology:** Point-to-point (one sender, one receiver)
- **Speed:** Typically up to 115.2 kbps, though higher rates are possible
- **Distance:** ~15 meters
- **Wiring:** 3 wires (TX, RX, GND)

UART is ideal for connecting a microcontroller to a GPS module, a serial terminal, or another microcontroller over short distances. It has minimal overhead but no built-in error detection.

**Arduino Code — UART Communication**

The Arduino's `Serial` object uses the hardware UART on pins 0 (RX) and 1 (TX). For communication on other pins, the `SoftwareSerial` library can emulate UART in software, though with limitations.

```cpp
// Sender (Master)
void setup() {
  Serial.begin(9600);  // Initialize UART at 9600 baud
}

void loop() {
  Serial.write('H');    // Send a single byte
  Serial.write('i');
  delay(1000);
}
```

```cpp
// Receiver (Slave)
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char incoming = Serial.read();
    Serial.print("Received: ");
    Serial.println(incoming);
  }
}
```

For multiple UART ports, boards like the Arduino Mega or ESP32 provide additional hardware serial interfaces (e.g., `Serial1`, `Serial2`).

---

## I2C (Inter-Integrated Circuit)

I2C is a **synchronous, multi-master** protocol designed for short-distance communication between chips on the same board. It uses just two wires: SDA (data) and SCL (clock).

**How it works:** Each device on the bus has a unique 7-bit (or 10-bit) address. The master initiates communication by sending a start condition, followed by the target device's address and a read/write bit. Devices acknowledge receipt, and data is transferred in 8-bit packets. The master generates the clock, and pull-up resistors keep both lines high when idle.

**Key characteristics:**

- **Topology:** Multi-master, multi-slave bus
- **Speed:** 100 kHz (standard), 400 kHz (fast mode), up to 3.4 MHz
- **Distance:** A few centimeters to a few meters
- **Wiring:** 2 wires (SDA, SCL) plus ground

I2C excels when you need to connect many low-speed peripherals—sensors, EEPROMs, displays—with minimal pin usage. The trade-off is lower throughput compared to SPI.

**Arduino Code — I2C Communication**

Arduino's `Wire` library handles I2C. The default pins are A4 (SDA) and A5 (SCL) on the Uno.

```cpp
#include <Wire.h>

#define SLAVE_ADDR 0x08

void setup() {
  Wire.begin();        // Join I2C bus as master
  Serial.begin(9600);
}

void loop() {
  // Request 1 byte from slave at address 0x08
  Wire.requestFrom(SLAVE_ADDR, 1);

  if (Wire.available()) {
    byte data = Wire.read();
    Serial.print("Received: ");
    Serial.println(data);
  }
  delay(500);
}
```

```cpp
// Slave device
#include <Wire.h>

byte counter = 0;

void setup() {
  Wire.begin(0x08);              // Join I2C bus with address 0x08
  Wire.onRequest(requestEvent);  // Register callback for master requests
}

void loop() {
  delay(100);
}

void requestEvent() {
  Wire.write(counter++);         // Send one byte to master
}
```

A common practical task is scanning the I2C bus to discover connected devices, which is useful for debugging.

---

## SPI (Serial Peripheral Interface)

SPI is a **synchronous, full-duplex** protocol known for its high speed. It uses four wires: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCK (clock), and SS (Slave Select).

**How it works:** The master controls the clock and selects which slave to communicate with by pulling that slave's SS line low. Data is shifted out on MOSI and in on MISO simultaneously, one bit per clock cycle. Unlike I2C, there's no addressing scheme—each slave needs its own SS line, which limits the number of devices.

**Key characteristics:**

- **Topology:** Master-slave with dedicated select lines
- **Speed:** Tens of MHz; much faster than I2C
- **Distance:** Very short (centimeters)
- **Wiring:** 4 wires per slave (MOSI, MISO, SCK, SS) plus ground

SPI is the go-to choice for high-bandwidth peripherals: SD cards, displays, flash memory, and high-speed sensors. The trade-off is pin consumption—each additional slave requires another SS line.

**Arduino Code — SPI Communication**

Arduino's `SPI` library handles the low-level details. On the Uno, the SPI pins are 11 (MOSI), 12 (MISO), 13 (SCK), and 10 (SS).

```cpp
#include <SPI.h>

#define SS_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(SS_PIN, OUTPUT);
  digitalWrite(SS_PIN, HIGH);  // Deselect slave
  SPI.begin();
  SPI.setClockDivider(SPI_CLOCK_DIV4);  // 4 MHz on 16 MHz Uno
}

void loop() {
  digitalWrite(SS_PIN, LOW);           // Select slave
  byte response = SPI.transfer(0x42);  // Send byte, receive response
  digitalWrite(SS_PIN, HIGH);          // Deselect slave

  Serial.print("Response: 0x");
  Serial.println(response, HEX);
  delay(500);
}
```

SPI's full-duplex nature means every transfer sends and receives simultaneously. Even if you only want to receive, you must send a dummy byte to generate clock cycles.

---

## CAN (Controller Area Network)

CAN is a **robust, multi-master, broadcast** protocol designed for noisy environments. It originated in the automotive industry and remains the standard for in-vehicle networks.

**How it works:** CAN uses a differential pair (CAN-H, CAN-L) for excellent noise immunity. Every node on the bus can transmit when idle. If multiple nodes transmit simultaneously, **bitwise arbitration** resolves the conflict: the message with the lowest identifier wins, and losing nodes retry later. This priority-based scheme ensures critical messages get through first.

**Key characteristics:**

- **Topology:** Multi-drop bus (many-to-many)
- **Speed:** Up to 1 Mbps
- **Distance:** 40 meters at 1 Mbps; up to 1000 meters at lower speeds
- **Wiring:** 2 wires (CAN-H, CAN-L) plus ground
- **Error handling:** CRC, acknowledgment, automatic retransmission

CAN's built-in error detection, fault confinement, and priority arbitration make it ideal for automotive, industrial, and robotics applications where reliability is paramount.

**Arduino Code — CAN Communication**

CAN requires an external controller (like the MCP2515) and a transceiver. The `mcp_can` library provides Arduino support.

```cpp
#include <SPI.h>
#include <mcp_can.h>

#define CS_PIN 10
MCP_CAN CAN(CS_PIN);

void setup() {
  Serial.begin(9600);

  // Initialize MCP2515 at 500 kbps with 16 MHz crystal
  if (CAN.begin(MCP_ANY, CAN_500KBPS, MCP_16MHZ) == CAN_OK) {
    Serial.println("CAN init OK");
  } else {
    Serial.println("CAN init failed");
    while (1);
  }

  CAN.setMode(MCP_NORMAL);
}

void loop() {
  unsigned char len = 0;
  unsigned char buf[8];
  unsigned long id;

  // Check for incoming messages
  if (CAN_MSGAVAIL == CAN.checkReceive()) {
    CAN.readMsgBuf(&id, &len, buf);

    Serial.print("ID: 0x");
    Serial.print(id, HEX);
    Serial.print(" Data: ");
    for (int i = 0; i < len; i++) {
      Serial.print(buf[i], HEX);
      Serial.print(" ");
    }
    Serial.println();
  }

  // Send a message every second
  static unsigned long lastSend = 0;
  if (millis() - lastSend > 1000) {
    lastSend = millis();
    unsigned char data[] = {0x01, 0x02, 0x03};
    CAN.sendMsgBuf(0x100, 0, 3, data);
  }
}
```

---

## Choosing the Right Protocol

| Protocol | Best For                                   | Speed      | Complexity |
| -------- | ------------------------------------------ | ---------- | ---------- |
| **UART** | Debugging, GPS, simple device-to-device    | Low-Medium | Very Low   |
| **I2C**  | Many low-speed sensors, minimal pins       | Low-Medium | Low        |
| **SPI**  | High-speed peripherals, SD cards, displays | High       | Low-Medium |
| **CAN**  | Noisy environments, automotive, multi-node | Medium     | High       |

**UART** is the simplest option when you just need two devices to exchange data. **I2C** shines when pin count matters and you have multiple low-speed peripherals. **SPI** is the choice when speed is critical. **CAN** is essential when reliability in harsh conditions is non-negotiable.

In practice, embedded systems often use multiple protocols simultaneously—reading sensors over I2C, logging to an SD card over SPI, and communicating with a host over UART. Mastering all four gives you the flexibility to match the right tool to each communication task.
