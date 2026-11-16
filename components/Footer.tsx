import VisitorBadge from "./VisitorBadge";
import { t, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="measure footer-grid">
        <div>
          <p className="footer-word">iris.luan</p>
          <p className="quiet">{d.footer.tagline}</p>
        </div>
        <div>
          <p className="meta-label">{d.footer.elsewhere}</p>
          <ul className="footer-links">
            <li>
              <a href="mailto:luanshuang.ls@gmail.com">hi@irisluan.com</a>
            </li>
            <li>
              <a href="https://x.com/Iris_LS_Luan">Twitter / X</a>
            </li>
            <li>
              <a href="https://github.com/shuangluan">GitHub</a>
            </li>
            <li>
              <a href="/rss.xml">{d.footer.rss}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="quiet">{d.footer.built(year)}</p>
          <VisitorBadge label={d.footer.readers} />
        </div>
      </div>
    </footer>
  );
}
