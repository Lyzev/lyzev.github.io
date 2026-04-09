/*
 * This file is part of https://github.com/Lyzev/lyzev.github.io.
 *
 * Copyright (c) 2026. Lyzev
 *
 * Piko is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3 of the License, or
 * (at your option) any later version.
 *
 * Piko is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with Piko. If not, see https://www.gnu.org/licenses/agpl-3.0.en.html.
 */

window.renderSharedFooter = function renderSharedFooter(target) {
  if (!target) return;

  target.innerHTML = `
    <footer class="app-footer">
      <div class="app-footer-inner">
        <p class="footer-cookie-note">
          No cookies are used directly by this website. Traffic is served via Cloudflare CDN and GitHub Pages for distribution and security, and they may set their own cookies. Please refer to the Cloudflare <a href="https://www.cloudflare.com/cookie-policy/" target="_blank" rel="noopener noreferrer">Cookie Policy</a>, Cloudflare <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, and GitHub <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">Privacy Statement</a> for details.
        </p>
        <div class="footer-bottom-row">
          <div class="footer-left">
            <p>Copyright &copy; ${new Date().getFullYear()} Lyzev. All rights reserved.</p>
          </div>
          <div class="footer-center">
            <p class="footer-links">
              <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">Hosted on GitHub Pages</a>
              <span class="footer-separator">|</span>
              <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer">License</a>
            </p>
          </div>
          <div class="footer-right">
            <p>Wall-nut Hills</p>
          </div>
        </div>
      </div>
    </footer>
  `;
};
