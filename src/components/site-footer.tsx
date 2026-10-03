import { Logo } from "@/components/logo";
import { SocialIcon } from "@/components/social-icon";
import { socials } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="bg-[#045a87] text-[#dceefb]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Logo className="h-12 w-12 rounded-full ring-2 ring-white/25" />
            <div>
              <p className="text-lg font-semibold tracking-tight text-white">
                EffessDev
              </p>
              <p className="mt-1 max-w-md text-sm text-[#b7dbf2]">
                © 2026 Faseeh Zaman F S. All Rights Reserved.
              </p>
            </div>
          </div>

          <ul className="flex items-center gap-3" aria-label="Social links">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${social.label} — ${social.blurb}`}
                  aria-label={`${social.label}: ${social.blurb}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-[#fce168] hover:text-[#045a87]"
                >
                  <SocialIcon label={social.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
