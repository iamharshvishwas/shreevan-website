const foundationStats = [
  { label: "Admin access", value: "Protected", note: "Cookie session behind login" },
  { label: "Admin domain", value: "Subdomain", note: "admin.* host proxy ready" },
  { label: "Settings", value: "Editable", note: "Global settings store added" },
  { label: "Build phase", value: "Home", note: "Section builder connected" },
];

const readinessItems = [
  ["Authentication shell", "Login, logout, protected session cookie and production env guard."],
  ["Admin routing", "Primary /admin route plus admin subdomain rewrite support."],
  ["Dashboard structure", "Operational cards and module slots for the next admin phases."],
  ["Public-site isolation", "CRM widget is skipped on admin routes and admin subdomain hosts."],
  ["Program manager", "Homepage program ordering and retreat summaries now come from admin data."],
  ["Content & Trust", "FAQs, Healing Stories and Journal seed content now use the admin store."],
  ["SEO & Leads", "Sitemap route controls and local enquiry capture now feed the admin inbox."],
  ["Home Page Builder", "Homepage body sections, repeaters and media references now come from admin data."],
];

const nextModules = [["V1 hardening", "Role permissions, audit log and external CRM sync.", "Next"]];

const operationalSignals = [
  ["Production host", "shreevanwellness.com"],
  ["Admin target", "admin.shreevanwellness.com"],
  ["Primary route", "/admin"],
  ["Session length", "8 hours"],
];

export function AdminDashboard() {
  return (
    <main className="admin-dashboard" aria-labelledby="admin-dashboard-title">
      <section className="admin-dashboard-hero">
        <div>
          <p className="admin-kicker">Private frontend management</p>
          <h2 id="admin-dashboard-title">
            Admin V1 now covers the homepage, settings, pages, programs, trust content, SEO and leads.
          </h2>
          <p>
            The Home Page builder adds section-by-section editing, repeatable blocks and upload-ready
            media slots for the public homepage.
          </p>
        </div>
        <div className="admin-status-panel" aria-label="Admin environment">
          <span>Environment</span>
          <dl>
            {operationalSignals.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="admin-stat-grid" aria-label="Foundation status">
        {foundationStats.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-kicker">Admin checklist</p>
            <h2>Foundation readiness</h2>
          </div>
          <div className="admin-readiness-list">
            {readinessItems.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="admin-panel admin-guardrail-panel">
          <div className="admin-panel-heading">
            <p className="admin-kicker">Publishing guardrails</p>
            <h2>Wellness-safe by default</h2>
          </div>
          <ul>
            <li>No cure, guaranteed detox or medical treatment claims.</li>
            <li>Admin pages stay noindex and separate from CRM visitor scripts.</li>
            <li>Production login requires configured environment credentials.</li>
            <li>Future publishing controls should require preview before publish.</li>
          </ul>
        </div>
      </section>

      <section className="admin-panel" aria-labelledby="admin-modules-title">
        <div className="admin-panel-heading admin-module-heading">
          <div>
            <p className="admin-kicker">Admin V1 roadmap</p>
            <h2 id="admin-modules-title">Next modules to connect</h2>
          </div>
          <span>Planned</span>
        </div>
        <div className="admin-module-grid">
          {nextModules.map(([title, copy, phase]) => (
            <article key={title}>
              <span>{phase}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
