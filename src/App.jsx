
import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, Users, FolderKanban, CheckSquare,
  Receipt, BarChart2, Bell, Search, ChevronRight,
  TrendingUp, TrendingDown, Clock, AlertCircle,
  CheckCircle2, Timer, ArrowUpRight,
  Building2, Globe, Mail, Calendar, DollarSign,
  Layers, Target, Zap, X,
  List, Columns3, Activity
} from "lucide-react";


// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Light corporate, crisp, premium
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  bg: "#F4F6FA",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  sidebar: "#0F1C3F",
  sidebarHov: "#1A2E5A",
  sidebarAct: "#1E3A6E",
  border: "#E2E8F4",
  borderMed: "#CBD5E8",
  // Text
  text: "#0D1B3E",
  sub: "#4A5878",
  muted: "#8896B3",
  faint: "#C4CEDF",
  white: "#FFFFFF",
  // Brand
  brand: "#1B4FD8",
  brandL: "#3B6FEE",
  brandXL: "#EEF2FF",
  brandGrad: "linear-gradient(135deg,#1B4FD8,#3B6FEE)",
  // Status
  green: "#0DA86A",
  greenBg: "#ECFDF5",
  greenBdr: "#A7F3D0",
  amber: "#D97706",
  amberBg: "#FFFBEB",
  amberBdr: "#FDE68A",
  red: "#DC2626",
  redBg: "#FEF2F2",
  redBdr: "#FECACA",
  blue: "#1B4FD8",
  blueBg: "#EEF2FF",
  blueBdr: "#C7D2FE",
  purple: "#7C3AED",
  purpleBg: "#F5F3FF",
  purpleBdr: "#DDD6FE",
  slate: "#64748B",
  // Charts
  chart: ["#1B4FD8", "#0DA86A", "#D97706", "#7C3AED", "#DC2626", "#0891B2", "#059669", "#DB2777"],
};

const font = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const CLIENTS = [
  { id: 1, name: "Vertex Labs", contact: "Alex Monroe", email: "alex@vertexlabs.io", country: "USA", status: "Active", value: 4800, currency: "USD", since: "Feb 2024", avatar: "VL", industry: "SaaS", tags: ["Retainer", "High-value"] },
  { id: 2, name: "NordScale GmbH", contact: "Mia Hoffmann", email: "mia@nordscale.de", country: "Germany", status: "Active", value: 3200, currency: "USD", since: "Mar 2024", avatar: "NS", industry: "Fintech", tags: ["Retainer"] },
  { id: 3, name: "Bloom Retail", contact: "Sara Osei", email: "sara@bloomretail.co", country: "UK", status: "Active", value: 1800, currency: "USD", since: "May 2024", avatar: "BR", industry: "E-commerce", tags: ["Project-based"] },
  { id: 4, name: "Tidal Apps", contact: "James Park", email: "james@tidalapps.com", country: "Canada", status: "Proposal", value: 2400, currency: "USD", since: "Jun 2024", avatar: "TA", industry: "Mobile", tags: ["New"] },
  { id: 5, name: "Solaris Energy", contact: "Lena Voss", email: "lena@solaris.eu", country: "Germany", status: "Active", value: 5600, currency: "USD", since: "Jan 2024", avatar: "SE", industry: "CleanTech", tags: ["Retainer", "High-value"] },
  { id: 6, name: "Craft & Co", contact: "Tom Reilly", email: "tom@craftco.ie", country: "Ireland", status: "Inactive", value: 900, currency: "USD", since: "Nov 2023", avatar: "CC", industry: "Agency", tags: ["Past"] },
  { id: 7, name: "Nexum Health", contact: "Priya Singh", email: "priya@nexumhealth.com", country: "USA", status: "Active", value: 3800, currency: "USD", since: "Apr 2024", avatar: "NH", industry: "HealthTech", tags: ["Retainer"] },
];

const PROJECTS = [
  { id: 1, clientId: 1, name: "Q3 Ops Overhaul", status: "In Progress", progress: 72, due: "2025-08-15", budget: 2400, spent: 1680, priority: "High", tasks: 12, done: 8 },
  { id: 2, clientId: 2, name: "SOP Documentation Pack", status: "In Progress", progress: 45, due: "2025-07-30", budget: 1600, spent: 720, priority: "Medium", tasks: 8, done: 3 },
  { id: 3, clientId: 3, name: "Admin Systems Setup", status: "Review", progress: 90, due: "2025-07-20", budget: 900, spent: 810, priority: "High", tasks: 6, done: 5 },
  { id: 4, clientId: 5, name: "Fractional COO — Month 3", status: "In Progress", progress: 60, due: "2025-07-31", budget: 2800, spent: 1680, priority: "High", tasks: 15, done: 9 },
  { id: 5, clientId: 7, name: "Onboarding SOP Suite", status: "Planning", progress: 15, due: "2025-08-28", budget: 1900, spent: 285, priority: "Medium", tasks: 10, done: 1 },
  { id: 6, clientId: 4, name: "Ops Audit & Roadmap", status: "Proposal", progress: 0, due: "2025-08-01", budget: 700, spent: 0, priority: "Low", tasks: 4, done: 0 },
  { id: 7, clientId: 1, name: "Team Delegation System", status: "Completed", progress: 100, due: "2025-06-30", budget: 1200, spent: 1200, priority: "Medium", tasks: 9, done: 9 },
];

const TASKS = [
  { id: 1, projectId: 1, title: "Audit current workflow bottlenecks", status: "Done", priority: "High", due: "2025-07-10", timeEst: 3, timeLog: 3.5 },
  { id: 2, projectId: 1, title: "Write department SOPs (3 docs)", status: "In Progress", priority: "High", due: "2025-07-22", timeEst: 6, timeLog: 4.0 },
  { id: 3, projectId: 1, title: "Set up Notion operations hub", status: "In Progress", priority: "Medium", due: "2025-07-25", timeEst: 4, timeLog: 1.5 },
  { id: 4, projectId: 1, title: "Weekly reporting template", status: "Todo", priority: "Medium", due: "2025-08-01", timeEst: 2, timeLog: 0 },
  { id: 5, projectId: 2, title: "Interview stakeholders (5 sessions)", status: "Done", priority: "High", due: "2025-07-12", timeEst: 5, timeLog: 5 },
  { id: 6, projectId: 2, title: "Draft SOP #1 — Customer Onboarding", status: "Done", priority: "High", due: "2025-07-15", timeEst: 3, timeLog: 2.8 },
  { id: 7, projectId: 2, title: "Draft SOP #2 — Internal Comms", status: "In Progress", priority: "Medium", due: "2025-07-25", timeEst: 3, timeLog: 1.2 },
  { id: 8, projectId: 3, title: "Deliverable review with client", status: "In Progress", priority: "High", due: "2025-07-18", timeEst: 2, timeLog: 1 },
  { id: 9, projectId: 4, title: "Monthly ops review call", status: "Done", priority: "High", due: "2025-07-05", timeEst: 1, timeLog: 1.2 },
  { id: 10, projectId: 4, title: "Process map — product delivery", status: "In Progress", priority: "High", due: "2025-07-28", timeEst: 5, timeLog: 2 },
  { id: 11, projectId: 5, title: "Discovery call & briefing", status: "Done", priority: "Medium", due: "2025-07-08", timeEst: 1, timeLog: 1 },
  { id: 12, projectId: 5, title: "Define onboarding scope", status: "In Progress", priority: "Medium", due: "2025-07-22", timeEst: 2, timeLog: 0.5 },
];

const INVOICES = [
  { id: "INV-001", clientId: 1, project: "Q3 Ops Overhaul", amount: 1200, status: "Paid", issued: "01 Jun 2025", due: "15 Jun 2025" },
  { id: "INV-002", clientId: 5, project: "Fractional COO — Month 2", amount: 2800, status: "Paid", issued: "01 Jun 2025", due: "15 Jun 2025" },
  { id: "INV-003", clientId: 2, project: "SOP Documentation Pack", amount: 800, status: "Paid", issued: "15 Jun 2025", due: "30 Jun 2025" },
  { id: "INV-004", clientId: 7, project: "Onboarding SOP Suite", amount: 950, status: "Pending", issued: "01 Jul 2025", due: "15 Jul 2025" },
  { id: "INV-005", clientId: 1, project: "Q3 Ops Overhaul — M2", amount: 1200, status: "Pending", issued: "01 Jul 2025", due: "20 Jul 2025" },
  { id: "INV-006", clientId: 5, project: "Fractional COO — Month 3", amount: 2800, status: "Draft", issued: "10 Jul 2025", due: "31 Jul 2025" },
  { id: "INV-007", clientId: 3, project: "Admin Systems Setup", amount: 900, status: "Overdue", issued: "20 Jun 2025", due: "05 Jul 2025" },
  { id: "INV-008", clientId: 4, project: "Ops Audit & Roadmap", amount: 700, status: "Draft", issued: "12 Jul 2025", due: "01 Aug 2025" },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 1200, expenses: 320, profit: 880 },
  { month: "Feb", revenue: 1800, expenses: 410, profit: 1390 },
  { month: "Mar", revenue: 2400, expenses: 520, profit: 1880 },
  { month: "Apr", revenue: 3100, expenses: 680, profit: 2420 },
  { month: "May", revenue: 4200, expenses: 890, profit: 3310 },
  { month: "Jun", revenue: 5800, expenses: 980, profit: 4820 },
  { month: "Jul", revenue: 6400, expenses: 1100, profit: 5300 },
];

const ACTIVITY = [
  { id: 1, icon: DollarSign, color: T.green, bg: T.greenBg, text: "INV-002 paid — $2,800 from Solaris Energy", time: "2 hrs ago" },
  { id: 2, icon: CheckCircle2, color: T.green, bg: T.greenBg, text: "Task 'Audit bottlenecks' marked complete", time: "4 hrs ago" },
  { id: 3, icon: Users, color: T.brand, bg: T.brandXL, text: "Tidal Apps proposal stage updated", time: "Yesterday" },
  { id: 4, icon: Target, color: T.purple, bg: T.purpleBg, text: "Team Delegation System — project completed", time: "2 days ago" },
  { id: 5, icon: AlertCircle, color: T.red, bg: T.redBg, text: "INV-007 is now overdue — $900", time: "3 days ago" },
  { id: 6, icon: Layers, color: T.brand, bg: T.brandXL, text: "SOP #1 draft finalised for NordScale", time: "4 days ago" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const statusMeta = s => ({
  "Active": { bg: T.greenBg, color: T.green, border: T.greenBdr },
  "In Progress": { bg: T.blueBg, color: T.blue, border: T.blueBdr },
  "Completed": { bg: T.greenBg, color: T.green, border: T.greenBdr },
  "Review": { bg: T.amberBg, color: T.amber, border: T.amberBdr },
  "Planning": { bg: T.purpleBg, color: T.purple, border: T.purpleBdr },
  "Proposal": { bg: "#F8FAFC", color: T.slate, border: T.faint },
  "Inactive": { bg: "#F8FAFC", color: T.muted, border: T.faint },
  "Paid": { bg: T.greenBg, color: T.green, border: T.greenBdr },
  "Pending": { bg: T.amberBg, color: T.amber, border: T.amberBdr },
  "Draft": { bg: "#F8FAFC", color: T.slate, border: T.faint },
  "Overdue": { bg: T.redBg, color: T.red, border: T.redBdr },
  "Done": { bg: T.greenBg, color: T.green, border: T.greenBdr },
  "Todo": { bg: "#F8FAFC", color: T.muted, border: T.faint },
  "High": { bg: T.redBg, color: T.red, border: T.redBdr },
  "Medium": { bg: T.amberBg, color: T.amber, border: T.amberBdr },
  "Low": { bg: T.greenBg, color: T.green, border: T.greenBdr },
}[s] || { bg: "#F8FAFC", color: T.muted, border: T.faint });

const tip = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 24px rgba(15,28,63,0.12)", fontFamily: font }}>
    <p style={{ margin: "0 0 6px", fontSize: 11, color: T.muted, fontWeight: 600 }}>{label}</p>
    {payload.map((p, i) => <p key={i} style={{ margin: "2px 0", fontSize: 12, color: p.color, fontWeight: 600 }}>{p.name}: <b>${p.value?.toLocaleString()}</b></p>)}
  </div>
) : null;

// ─────────────────────────────────────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function Badge({ label }) {
  const m = statusMeta(label);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: m.bg, color: m.color, border: `1px solid ${m.border}`, whiteSpace: "nowrap", fontFamily: font }}>
      {label}
    </span>
  );
}

function Avatar({ initials, size = 34 }) {
  const colors = ["#1B4FD8", "#0DA86A", "#7C3AED", "#D97706", "#0891B2", "#DC2626"];
  const idx = initials.charCodeAt(0) % colors.length;
  const c = colors[idx];
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.3, background: `${c}15`, border: `1.5px solid ${c}30`, display: "flex", alignItems: "center", justifyContent: "center", color: c, fontSize: size * 0.33, fontWeight: 700, fontFamily: font, flexShrink: 0, letterSpacing: -0.5 }}>
      {initials}
    </div>
  );
}

function Bar2({ value, color = T.brand, h = 6 }) {
  return (
    <div style={{ background: T.bg, borderRadius: h, height: h, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(value, 100)}%`, height: "100%", background: color, borderRadius: h, transition: "width 0.5s ease" }} />
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, sub, color = T.brand, trend, trendUp }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${color}06`, borderRadius: "0 14px 0 80px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={color} strokeWidth={2} />
        </div>
        {trend !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: trendUp ? T.greenBg : T.redBg, borderRadius: 20, padding: "3px 9px" }}>
            {trendUp ? <TrendingUp size={11} color={T.green} /> : <TrendingDown size={11} color={T.red} />}
            <span style={{ fontSize: 11, fontWeight: 700, color: trendUp ? T.green : T.red }}>{trend}</span>
          </div>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: -0.5, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 5, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color, marginTop: 6, fontWeight: 600 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ title, sub, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: T.text, letterSpacing: -0.3 }}>{title}</h2>
        {sub && <p style={{ margin: "3px 0 0", fontSize: 12, color: T.muted, fontWeight: 500 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{ background: active ? T.brand : "transparent", color: active ? T.white : T.muted, border: `1.5px solid ${active ? T.brand : T.border}`, borderRadius: 8, padding: "5px 14px", cursor: "pointer", fontFamily: font, fontSize: 12, fontWeight: 600, transition: "all 0.15s" }}>
      {children}
    </button>
  );
}

function ChartBox({ title, sub, height = 220, children }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 20px 14px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
      <SectionTitle title={title} sub={sub} />
      <ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard() {
  const paid = INVOICES.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = INVOICES.filter(i => ["Pending", "Overdue"].includes(i.status)).reduce((s, i) => s + i.amount, 0);
  const activeC = CLIENTS.filter(c => c.status === "Active").length;
  const liveP = PROJECTS.filter(p => ["In Progress", "Review"].includes(p.status)).length;
  const overdue = INVOICES.filter(i => i.status === "Overdue").length;

  const projStatus = ["In Progress", "Review", "Planning", "Completed", "Proposal"].map(s => ({
    name: s, value: PROJECTS.filter(p => p.status === s).length
  })).filter(d => d.value > 0);

  const radar = [
    { m: "Revenue", v: 82 }, { m: "Client Sat", v: 91 }, { m: "Delivery", v: 78 },
    { m: "Retention", v: 88 }, { m: "Pipeline", v: 65 }, { m: "Utilisation", v: 74 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
        <KpiCard icon={DollarSign} label="Revenue Collected" value={`$${paid.toLocaleString()}`} color={T.green} trend="+18%" trendUp />
        <KpiCard icon={Clock} label="Outstanding" value={`$${outstanding.toLocaleString()}`} color={T.amber} trend="-5%" trendUp={false} />
        <KpiCard icon={Users} label="Active Clients" value={activeC} color={T.brand} trend="+12%" trendUp />
        <KpiCard icon={FolderKanban} label="Live Projects" value={liveP} color={T.purple} trend="+8%" trendUp />
        <KpiCard icon={AlertCircle} label="Overdue Invoices" value={overdue} color={T.red} sub="Needs attention" />
      </div>

      {/* Charts row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
        <ChartBox title="Revenue & Profit" sub="Monthly trend — USD" height={210}>
          <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.brand} stopOpacity={0.15} />
                <stop offset="100%" stopColor={T.brand} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gPrf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.green} stopOpacity={0.12} />
                <stop offset="100%" stopColor={T.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: T.muted, fontSize: 11, fontFamily: font }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
            <Tooltip content={tip} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke={T.brand} strokeWidth={2.5} fill="url(#gRev)" />
            <Area type="monotone" dataKey="profit" name="Profit" stroke={T.green} strokeWidth={2} fill="url(#gPrf)" strokeDasharray="0" />
          </AreaChart>
        </ChartBox>

        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <SectionTitle title="Project Status" sub="Current breakdown" />
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={projStatus} cx="50%" cy="50%" innerRadius={48} outerRadius={70} paddingAngle={3} dataKey="value">
                {projStatus.map((_, i) => <Cell key={i} fill={T.chart[i]} stroke="none" />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: font, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
            {projStatus.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: T.chart[i] }} />
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr 1fr", gap: 14 }}>
        <ChartBox title="Monthly Revenue" sub="Invoiced by month" height={180}>
          <BarChart data={REVENUE_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -14 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: T.muted, fontSize: 11, fontFamily: font }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
            <Tooltip content={tip} />
            <Bar dataKey="revenue" name="Revenue" fill={T.brand} radius={[5, 5, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill={T.faint} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ChartBox>

        <ChartBox title="Performance" sub="Key metrics" height={200}>
          <RadarChart data={radar}>
            <PolarGrid stroke={T.border} />
            <PolarAngleAxis dataKey="m" tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} />
            <Radar dataKey="v" stroke={T.brand} fill={T.brand} fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ChartBox>

        {/* Activity */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <SectionTitle title="Activity" sub="Recent events" />
          {ACTIVITY.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color={a.color} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 12, color: T.text, lineHeight: 1.5, fontWeight: 500 }}>{a.text}</p>
                  <span style={{ fontSize: 10, color: T.muted }}>{a.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <SectionTitle title="Top Clients" sub="By contract value" />
          {[...CLIENTS].sort((a, b) => b.value - a.value).slice(0, 5).map((c, i) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
              <span style={{ fontSize: 11, color: T.muted, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{i + 1}</span>
              <Avatar initials={c.avatar} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{c.country} · {c.industry}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.brand }}>${c.value.toLocaleString()}</div>
                <Badge label={c.status} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <SectionTitle title="Upcoming Deadlines" sub="Pending tasks" />
          {TASKS.filter(t => t.status !== "Done").slice(0, 5).map((t, i) => {
            const proj = PROJECTS.find(p => p.id === t.projectId);
            const client = CLIENTS.find(c => c.id === proj?.clientId);
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ width: 3, height: 36, borderRadius: 2, background: statusMeta(t.priority).color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{client?.name} · {t.due}</div>
                </div>
                <Badge label={t.status} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENTS
// ─────────────────────────────────────────────────────────────────────────────
function ClientsView() {
  const [filter, setFilter] = useState("All");
  const [sel, setSel] = useState(null);
  const filtered = filter === "All" ? CLIENTS : CLIENTS.filter(c => c.status === filter);

  return (
    <div style={{ display: "grid", gridTemplateColumns: sel ? "1.1fr 1fr" : "1fr", gap: 20 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <SectionTitle title="Clients" sub={`${CLIENTS.length} total · ${CLIENTS.filter(c => c.status === "Active").length} active`} />
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Active", "Proposal", "Inactive"].map(s => <Pill key={s} active={filter === s} onClick={() => setFilter(s)}>{s}</Pill>)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => setSel(sel?.id === c.id ? null : c)}
              style={{ background: T.surface, border: `1.5px solid ${sel?.id === c.id ? T.brand : T.border}`, borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 0.15s", boxShadow: sel?.id === c.id ? "0 0 0 3px #1B4FD810" : "0 1px 4px rgba(15,28,63,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar initials={c.avatar} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{c.name}</span>
                    <Badge label={c.status} />
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, fontWeight: 500, display: "flex", gap: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={10} /> {c.contact}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Globe size={10} /> {c.country}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building2 size={10} /> {c.industry}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.brand }}>${c.value.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>Since {c.since}</div>
                </div>
              </div>
              {c.tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                  {c.tags.map(tg => {
                    const m = statusMeta(tg === "High-value" ? "High" : tg === "Retainer" ? "Active" : tg === "New" ? "Proposal" : "Inactive");
                    return <span key={tg} style={{ fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20, background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>{tg}</span>;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Avatar initials={sel.avatar} size={50} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.text }}>{sel.name}</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: T.muted, fontWeight: 500 }}>{sel.industry} · {sel.country}</p>
                </div>
              </div>
              <button onClick={() => setSel(null)} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color={T.muted} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[[Users, "Contact", sel.contact], [Mail, "Email", sel.email], [Calendar, "Since", sel.since], [DollarSign, "Total Value", `$${sel.value.toLocaleString()}`]].map(([Icon, k, v]) => (
                <div key={k} style={{ background: T.bg, borderRadius: 9, padding: "10px 12px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon size={14} color={T.muted} style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 10, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px" }}>
            <SectionTitle title="Projects" sub={`${PROJECTS.filter(p => p.clientId === sel.id).length} total`} />
            {PROJECTS.filter(p => p.clientId === sel.id).map(p => (
              <div key={p.id} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{p.name}</span>
                  <Badge label={p.status} />
                </div>
                <Bar2 value={p.progress} color={statusMeta(p.status).color} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                  <span style={{ fontSize: 11, color: T.muted }}>Due {p.due}</span>
                  <span style={{ fontSize: 11, color: T.brand, fontWeight: 700 }}>{p.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px" }}>
            <SectionTitle title="Invoices" />
            {INVOICES.filter(i => i.clientId === sel.id).map((inv, i, arr) => (
              <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.brand }}>{inv.id}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{inv.project}</div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>${inv.amount.toLocaleString()}</span>
                  <Badge label={inv.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
function ProjectsView() {
  const [view, setView] = useState("board");
  const cols = ["Planning", "Proposal", "In Progress", "Review", "Completed"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle title="Projects" sub={`${PROJECTS.length} total · ${PROJECTS.filter(p => p.status === "In Progress").length} active`} />
        <div style={{ display: "flex", gap: 6 }}>
          <Pill active={view === "board"} onClick={() => setView("board")}><span style={{ display: "flex", alignItems: "center", gap: 5 }}><Columns3 size={13} />Board</span></Pill>
          <Pill active={view === "list"} onClick={() => setView("list")}><span style={{ display: "flex", alignItems: "center", gap: 5 }}><List size={13} />List</span></Pill>
        </div>
      </div>

      {view === "board" && (
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, alignItems: "flex-start" }}>
          {cols.map(col => {
            const items = PROJECTS.filter(p => p.status === col);
            const cm = statusMeta(col);
            return (
              <div key={col} style={{ minWidth: 220, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 2px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: cm.color }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, textTransform: "uppercase", letterSpacing: 0.6 }}>{col}</span>
                  <span style={{ fontSize: 11, color: T.muted, background: T.bg, padding: "1px 7px", borderRadius: 10, fontWeight: 600 }}>{items.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(p => {
                    const client = CLIENTS.find(c => c.id === p.clientId);
                    return (
                      <div key={p.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px", cursor: "pointer", transition: "box-shadow 0.15s", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,28,63,0.12)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(15,28,63,0.05)"}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.text, lineHeight: 1.4, flex: 1, paddingRight: 6 }}>{p.name}</span>
                          <Badge label={p.priority} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                          <Avatar initials={client?.avatar || "??"} size={20} />
                          <span style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{client?.name}</span>
                        </div>
                        <Bar2 value={p.progress} color={cm.color} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                          <span style={{ fontSize: 10, color: T.muted, display: "flex", alignItems: "center", gap: 3 }}><CheckSquare size={10} /> {p.done}/{p.tasks}</span>
                          <span style={{ fontSize: 10, color: T.brand, fontWeight: 700 }}>${p.spent.toLocaleString()} / ${p.budget.toLocaleString()}</span>
                        </div>
                        <div style={{ marginTop: 6, fontSize: 10, color: T.muted, display: "flex", alignItems: "center", gap: 3 }}><Calendar size={10} /> {p.due}</div>
                      </div>
                    );
                  })}
                  {items.length === 0 && (
                    <div style={{ background: T.bg, border: `2px dashed ${T.border}`, borderRadius: 12, padding: "20px", textAlign: "center", color: T.faint, fontSize: 11, fontWeight: 600 }}>Empty</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "list" && (
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}`, background: T.bg }}>
                {["Project", "Client", "Status", "Progress", "Budget", "Due", "Priority"].map(h => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, color: T.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p, i) => {
                const client = CLIENTS.find(c => c.id === p.clientId);
                return (
                  <tr key={p.id} style={{ borderBottom: i < PROJECTS.length - 1 ? `1px solid ${T.border}` : "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = T.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 700, color: T.text }}>{p.name}</td>
                    <td style={{ padding: "13px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar initials={client?.avatar || "??"} size={26} /><span style={{ fontSize: 13, color: T.text }}>{client?.name}</span></div></td>
                    <td style={{ padding: "13px 16px" }}><Badge label={p.status} /></td>
                    <td style={{ padding: "13px 16px", minWidth: 110 }}><Bar2 value={p.progress} /><span style={{ fontSize: 10, color: T.muted, marginTop: 3, display: "block", fontWeight: 600 }}>{p.progress}%</span></td>
                    <td style={{ padding: "13px 16px", fontSize: 12, fontWeight: 700, color: T.brand }}>${p.spent.toLocaleString()} / ${p.budget.toLocaleString()}</td>
                    <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted, fontWeight: 500 }}>{p.due}</td>
                    <td style={{ padding: "13px 16px" }}><Badge label={p.priority} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TASKS
// ─────────────────────────────────────────────────────────────────────────────
function TasksView() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? TASKS : TASKS.filter(t => t.status === filter);
  const grouped = PROJECTS.map(p => ({ ...p, list: filtered.filter(t => t.projectId === p.id), client: CLIENTS.find(c => c.id === p.clientId) })).filter(p => p.list.length > 0);
  const done = TASKS.filter(t => t.status === "Done").length;
  const logged = TASKS.reduce((s, t) => s + t.timeLog, 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <SectionTitle title="Tasks" sub={`${done} of ${TASKS.length} completed · ${logged.toFixed(1)}h logged`} />
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Todo", "In Progress", "Done"].map(f => <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>)}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[[CheckSquare, "Total Tasks", TASKS.length, T.brand], [Activity, "In Progress", TASKS.filter(t => t.status === "In Progress").length, T.amber], [CheckCircle2, "Completed", done, T.green], [Timer, "Hours Logged", `${logged.toFixed(1)}h`, T.purple]].map(([Icon, l, v, c]) => (
          <div key={l} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `${c}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={17} color={c} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>{v}</div>
                <div style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{l}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {grouped.map(proj => (
          <div key={proj.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
            <div style={{ padding: "12px 18px", background: T.bg, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={proj.client?.avatar || "??"} size={30} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{proj.name}</span>
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 500, marginLeft: 10 }}>{proj.client?.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 80 }}><Bar2 value={proj.progress} color={statusMeta(proj.status).color} /></div>
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 700, minWidth: 30 }}>{proj.progress}%</span>
                <Badge label={proj.status} />
              </div>
            </div>
            {proj.list.map((t, i) => {
              const isDone = t.status === "Done";
              return (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", borderBottom: i < proj.list.length - 1 ? `1px solid ${T.border}` : "none", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.bg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${isDone ? T.green : T.border}`, background: isDone ? T.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isDone && <CheckCircle2 size={10} color="#fff" strokeWidth={3} />}
                  </div>
                  <span style={{ flex: 1, fontSize: 13, color: isDone ? T.muted : T.text, fontWeight: isDone ? 400 : 500, textDecoration: isDone ? "line-through" : "none" }}>{t.title}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Badge label={t.priority} />
                    <Badge label={t.status} />
                    <span style={{ fontSize: 11, color: T.muted, fontWeight: 600, minWidth: 80, textAlign: "right", display: "flex", alignItems: "center", gap: 4 }}><Timer size={11} />{t.timeLog}h / {t.timeEst}h</span>
                    <span style={{ fontSize: 11, color: T.muted, fontWeight: 500, minWidth: 82, textAlign: "right", display: "flex", alignItems: "center", gap: 4 }}><Calendar size={11} />{t.due}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE
// ─────────────────────────────────────────────────────────────────────────────
function FinanceView() {
  const [filter, setFilter] = useState("All");
  const paid = INVOICES.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = INVOICES.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const overdue = INVOICES.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
  const draft = INVOICES.filter(i => i.status === "Draft").reduce((s, i) => s + i.amount, 0);
  const filtered = filter === "All" ? INVOICES : INVOICES.filter(i => i.status === filter);

  return (
    <div>
      <SectionTitle title="Finance & Invoices" sub="Revenue tracking and invoice management" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        <KpiCard icon={CheckCircle2} label="Collected" value={`$${paid.toLocaleString()}`} color={T.green} trend="+22%" trendUp />
        <KpiCard icon={Clock} label="Pending" value={`$${pending.toLocaleString()}`} color={T.amber} />
        <KpiCard icon={AlertCircle} label="Overdue" value={`$${overdue.toLocaleString()}`} color={T.red} sub="Immediate action needed" />
        <KpiCard icon={Receipt} label="Draft" value={`$${draft.toLocaleString()}`} color={T.muted} sub="Not yet sent" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 20 }}>
        <ChartBox title="Cash Flow" sub="Revenue vs profit trend" height={190}>
          <LineChart data={REVENUE_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: T.muted, fontSize: 11, fontFamily: font }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
            <Tooltip content={tip} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke={T.brand} strokeWidth={2.5} dot={{ r: 3, fill: T.brand }} />
            <Line type="monotone" dataKey="profit" name="Profit" stroke={T.green} strokeWidth={2} dot={false} strokeDasharray="5 4" />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke={T.amber} strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
          </LineChart>
        </ChartBox>

        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <SectionTitle title="Revenue Split" sub="By status" />
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={[{ n: "Paid", v: paid }, { n: "Pending", v: pending }, { n: "Overdue", v: overdue }, { n: "Draft", v: draft }]}
                cx="50%" cy="50%" outerRadius={68} paddingAngle={3} dataKey="v" nameKey="n">
                {[T.green, T.amber, T.red, T.faint].map((c, i) => <Cell key={i} fill={c} stroke="none" />)}
              </Pie>
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`]} contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: font, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {[["Paid", T.green, paid], ["Pending", T.amber, pending], ["Overdue", T.red, overdue], ["Draft", T.faint, draft]].map(([l, c, v]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{l} ${v.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>All Invoices</div>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Paid", "Pending", "Overdue", "Draft"].map(f => <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>)}
        </div>
      </div>

      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}`, background: T.bg }}>
              {["Invoice", "Client", "Project", "Amount", "Status", "Issued", "Due"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, color: T.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => {
              const client = CLIENTS.find(c => c.id === inv.clientId);
              return (
                <tr key={inv.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.bg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: T.brand, fontSize: 12 }}>{inv.id}</td>
                  <td style={{ padding: "13px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar initials={client?.avatar || "??"} size={26} /><span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{client?.name}</span></div></td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted, fontWeight: 500, maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inv.project}</td>
                  <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 800, color: T.text }}>${inv.amount.toLocaleString()}</td>
                  <td style={{ padding: "13px 16px" }}><Badge label={inv.status} /></td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted }}>{inv.issued}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: inv.status === "Overdue" ? T.red : T.muted, fontWeight: inv.status === "Overdue" ? 700 : 400 }}>{inv.due}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────
function AnalyticsView() {
  const clientVal = [...CLIENTS].sort((a, b) => b.value - a.value).map(c => ({ name: c.avatar, value: c.value, full: c.name }));
  const taskComp = PROJECTS.map(p => ({ name: p.name.length > 20 ? p.name.slice(0, 20) + "…" : p.name, done: p.done, rem: p.tasks - p.done }));
  const weekly = [{ w: "Wk 1", h: 14 }, { w: "Wk 2", h: 18 }, { w: "Wk 3", h: 11 }, { w: "Wk 4", h: 21 }, { w: "Wk 5", h: 16 }, { w: "Wk 6", h: 19 }, { w: "Wk 7", h: 22 }, { w: "Wk 8", h: 17 }];

  const kpis = [
    { icon: DollarSign, l: "Avg Project Budget", v: "$1,786", t: "+12%", up: true, c: T.brand },
    { icon: Target, l: "Budget Utilisation", v: "74.2%", t: "+5%", up: true, c: T.green },
    { icon: Zap, l: "On-Time Delivery", v: "83%", t: "+8%", up: true, c: T.purple },
    { icon: Users, l: "Client Retention", v: "88%", t: "+3%", up: true, c: T.brand },
    { icon: Timer, l: "Avg Task Duration", v: "3.1h", t: "-0.4h", up: false, c: T.amber },
    { icon: ArrowUpRight, l: "Revenue / Client", v: "$3,443", t: "+21%", up: true, c: T.green },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionTitle title="Analytics & Reports" sub="Performance insights across all projects and clients" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
        {kpis.map(k => (
          <div key={k.l} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 14px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)", borderTop: `3px solid ${k.c}` }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${k.c}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <k.icon size={16} color={k.c} strokeWidth={2} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: -0.5 }}>{k.v}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 3, fontWeight: 500, lineHeight: 1.4 }}>{k.l}</div>
            <div style={{ fontSize: 10, color: k.up ? T.green : T.amber, fontWeight: 700, marginTop: 5, display: "flex", alignItems: "center", gap: 3 }}>
              {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{k.t}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <ChartBox title="Client Value Ranking" sub="Contract value by client" height={220}>
          <BarChart data={clientVal} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
            <XAxis type="number" tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
            <YAxis type="category" dataKey="name" tick={{ fill: T.muted, fontSize: 11, fontFamily: font }} axisLine={false} tickLine={false} width={28} />
            <Tooltip formatter={(v, _, p) => [`$${v.toLocaleString()}`, p.payload.full]} contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: font, fontSize: 12 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {clientVal.map((_, i) => <Cell key={i} fill={T.chart[i % T.chart.length]} />)}
            </Bar>
          </BarChart>
        </ChartBox>

        <ChartBox title="Weekly Hours Logged" sub="Time tracked per week" height={220}>
          <AreaChart data={weekly} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.purple} stopOpacity={0.15} />
                <stop offset="100%" stopColor={T.purple} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="w" tick={{ fill: T.muted, fontSize: 11, fontFamily: font }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => [`${v}h`, "Hours"]} contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: font, fontSize: 12 }} />
            <Area type="monotone" dataKey="h" name="Hours" stroke={T.purple} strokeWidth={2.5} fill="url(#gH)" />
          </AreaChart>
        </ChartBox>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <ChartBox title="Task Completion by Project" sub="Done vs remaining" height={210}>
          <BarChart data={taskComp} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
            <XAxis type="number" tick={{ fill: T.muted, fontSize: 10, fontFamily: font }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: T.muted, fontSize: 9, fontFamily: font }} axisLine={false} tickLine={false} width={115} />
            <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: font, fontSize: 12 }} />
            <Bar dataKey="done" name="Done" stackId="a" fill={T.green} radius={[0, 0, 0, 0]} />
            <Bar dataKey="rem" name="Remaining" stackId="a" fill={T.border} radius={[0, 5, 5, 0]} />
          </BarChart>
        </ChartBox>

        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(15,28,63,0.05)" }}>
          <SectionTitle title="Budget Health" sub="Spent vs allocated per project" />
          {PROJECTS.filter(p => p.budget > 0).map(p => {
            const pct = Math.round((p.spent / p.budget) * 100);
            const c = pct > 90 ? T.red : pct > 70 ? T.amber : T.green;
            return (
              <div key={p.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{p.name.length > 30 ? p.name.slice(0, 30) + "…" : p.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: c }}>{pct}%</span>
                </div>
                <Bar2 value={pct} color={c} h={7} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: T.muted, fontWeight: 500 }}>Spent ${p.spent.toLocaleString()}</span>
                  <span style={{ fontSize: 10, color: T.muted, fontWeight: 500 }}>Budget ${p.budget.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP SHELL
// ─────────────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { id: "clients", Icon: Users, label: "Clients" },
  { id: "projects", Icon: FolderKanban, label: "Projects" },
  { id: "tasks", Icon: CheckSquare, label: "Tasks" },
  { id: "finance", Icon: Receipt, label: "Finance" },
  { id: "analytics", Icon: BarChart2, label: "Analytics" },
];

export default function App() {
  const [view, setView] = useState("dashboard");
  const overdueCount = INVOICES.filter(i => i.status === "Overdue").length;

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: font, color: T.text, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: 232, background: T.sidebar, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1B4FD8,#3B6FEE)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(27,79,216,0.5)" }}>
              <Layers size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", letterSpacing: -0.3 }}>OPSLY</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Agency OS</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, padding: "4px 12px 10px" }}>Main Menu</div>
          {NAV.map(({ id, Icon, label }) => {
            const active = view === id;
            return (
              <button key={id} onClick={() => setView(id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                color: active ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                transition: "all 0.15s", fontFamily: font, fontSize: 13, fontWeight: active ? 700 : 500,
                textAlign: "left", position: "relative",
              }}
                onMouseEnter={e => !active && (e.currentTarget.style.background = "rgba(255,255,255,0.06)", e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, background: T.brandL, borderRadius: "0 3px 3px 0" }} />}
                <Icon size={17} strokeWidth={active ? 2.5 : 2} />
                {label}
                {id === "finance" && overdueCount > 0 && (
                  <span style={{ marginLeft: "auto", background: T.red, color: "#fff", borderRadius: 10, minWidth: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, padding: "0 5px" }}>{overdueCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div style={{ padding: "14px 14px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", borderRadius: 10, background: "rgba(255,255,255,0.05)" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#1B4FD8,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>YN</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Your Name</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Ops Specialist</div>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.green, flexShrink: 0 }} />
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header style={{ height: 60, background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0, boxShadow: "0 1px 0 rgba(15,28,63,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.text, textTransform: "capitalize" }}>{view}</span>
            <ChevronRight size={14} color={T.muted} />
            <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>
              {view === "dashboard" && "Overview"}
              {view === "clients" && `${CLIENTS.length} clients`}
              {view === "projects" && `${PROJECTS.length} projects`}
              {view === "tasks" && `${TASKS.length} tasks`}
              {view === "finance" && `${INVOICES.length} invoices`}
              {view === "analytics" && "Performance overview"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {overdueCount > 0 && (
              <div style={{ background: T.redBg, border: `1px solid ${T.redBdr}`, borderRadius: 8, padding: "5px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                <AlertCircle size={13} color={T.red} />
                <span style={{ fontSize: 12, fontWeight: 600, color: T.red }}>{overdueCount} overdue invoice{overdueCount > 1 ? "s" : ""}</span>
              </div>
            )}
            <div style={{ width: 36, height: 36, borderRadius: 9, background: T.bg, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={16} color={T.muted} />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: T.bg, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Search size={16} color={T.muted} />
            </div>
            <div style={{ height: 24, width: 1, background: T.border }} />
            <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={13} color={T.muted} />
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "26px 28px" }}>
          {view === "dashboard" && <Dashboard />}
          {view === "clients" && <ClientsView />}
          {view === "projects" && <ProjectsView />}
          {view === "tasks" && <TasksView />}
          {view === "finance" && <FinanceView />}
          {view === "analytics" && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
}
export default App;
