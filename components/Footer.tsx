'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © 2026 Base Oracle | Powered by Base
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="https://zora.co/@basedoracle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Zora
          </Link>
          <Link
            href="https://base.app/profile/basedoracle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Base.app
          </Link>
          <Link
            href="https://www.clanker.world/clanker/0x1402fB10817527C06Ec8AE145844A71c78c18B07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Clanker
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          CA: 0x7216fe9ab99a838ce4df9e12eadd78705433c79b
        </p>
      </div>
    </footer>
  )
}
