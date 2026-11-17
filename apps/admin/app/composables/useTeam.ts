import type {
  InviteForm,
  TeamFilters,
  TeamHubKey,
  TeamMember,
  TeamRoleKey,
} from "~/types/team";

type Seed = Pick<
  TeamMember,
  "id" | "name" | "arabicName" | "title" | "email" | "phone" | "role" | "hub" | "stationRole"
> &
  Partial<TeamMember>;

/** Fills the presence fields with the common case: an active, offline, 2FA-verified member */
const member = (s: Seed): TeamMember => ({
  initials: initialsOf(s.name),
  status: "active",
  isOnline: false,
  lastSeen: "Offline",
  twoFactor: true,
  ...s,
});

const initialTeam = (): TeamMember[] => [
  member({
    id: 1,
    name: "Amr Mohamed",
    arabicName: "عمرو محمد",
    title: "Concessionaire / Ops Director",
    email: "amr.m@nilebus.eg",
    phone: "+20 100 123 4567",
    role: "owner",
    hub: "almaza",
    stationRole: "HQ Command Desk",
    isOnline: true,
    lastSeen: "Active now (Web Ops)",
  }),
  member({
    id: 2,
    name: "Tarek Mansour",
    arabicName: "طارق منصور",
    title: "Senior Operations Lead",
    email: "tarek.m@nilebus.eg",
    phone: "+20 122 987 6543",
    role: "manager",
    hub: "almaza",
    stationRole: "Platform Shift Lead",
    lastSeen: "21 mins ago (Mobile)",
  }),
  member({
    id: 3,
    name: "Hesham Zaki",
    arabicName: "هشام زكي",
    title: "Alexandria Depot Manager",
    email: "hesham.z@nilebus.eg",
    phone: "+20 111 456 7890",
    role: "manager",
    hub: "moharam",
    stationRole: "Station Lead",
    lastSeen: "1h ago (Gate Scanner)",
  }),
  member({
    id: 4,
    name: "Ahmed Mostafa",
    arabicName: "أحمد مصطفى",
    title: "Red Sea Gate Supervisor",
    email: "ahmed.m@nilebus.eg",
    phone: "+20 106 333 2211",
    role: "dispatcher",
    hub: "hurghada",
    stationRole: "Express Check-in",
    isOnline: true,
    lastSeen: "Active now (Scanner)",
  }),
  member({
    id: 5,
    name: "Youssef Fekri",
    arabicName: "يوسف فكري",
    title: "Terminal Gate Officer",
    email: "youssef.f@nilebus.eg",
    phone: "+20 155 777 8899",
    role: "dispatcher",
    hub: "almaza",
    stationRole: "Luggage Pier Bay",
    lastSeen: "2h ago (PNR Terminal)",
  }),
  member({
    id: 6,
    name: "Salma Radwan",
    arabicName: "سلمى رضوان",
    title: "Senior Cashier & PNR Officer",
    email: "salma.r@nilebus.eg",
    phone: "+20 128 555 1234",
    role: "counter",
    hub: "giza",
    stationRole: "Front Desk / POS",
    isOnline: true,
    lastSeen: "Active now (Cash Desk)",
  }),
  member({
    id: 7,
    name: "Hany Gabr",
    arabicName: "هاني جابر",
    title: "Night Shift Conductor",
    email: "hany.g@nilebus.eg",
    phone: "+20 109 444 5678",
    role: "dispatcher",
    hub: "asyut",
    stationRole: "Upper Egypt Line",
    lastSeen: "Yesterday, 22:15",
  }),
  member({
    id: 8,
    name: "Reem Badr",
    arabicName: "ريم بدر",
    title: "Ticketing Assistant",
    email: "reem.b@nilebus.eg",
    phone: "+20 114 321 0987",
    role: "counter",
    hub: "almaza",
    stationRole: "Frontline PNR",
    lastSeen: "Oct 24, 2024 (Offline)",
  }),
  member({
    id: 9,
    name: "Mona Fathy",
    arabicName: "منى فتحي",
    title: "Platform Dispatcher",
    email: "mona.f@nilebus.eg",
    phone: "+20 100 765 4321",
    role: "dispatcher",
    hub: "almaza",
    stationRole: "Gates A1–A2",
    isOnline: true,
    lastSeen: "Active now (Scanner)",
  }),
  member({
    id: 10,
    name: "Omar Said",
    arabicName: "عمر سعيد",
    title: "Gate Dispatcher",
    email: "omar.s@nilebus.eg",
    phone: "+20 112 234 5678",
    role: "dispatcher",
    hub: "moharam",
    stationRole: "Ticket Bay 2",
    isOnline: true,
    lastSeen: "Active now (Gate Scanner)",
  }),
  member({
    id: 11,
    name: "Nada Wahba",
    arabicName: "ندى وهبة",
    title: "Dispatcher",
    email: "nada.w@nilebus.eg",
    phone: "+20 127 890 1234",
    role: "dispatcher",
    hub: "hurghada",
    stationRole: "Tourist Express Gate",
    status: "pending",
    twoFactor: false,
    lastSeen: "Invited (Pending)",
  }),
  member({
    id: 12,
    name: "Ali Darwish",
    arabicName: "علي درويش",
    title: "Counter Clerk",
    email: "ali.d@nilebus.eg",
    phone: "+20 101 555 6677",
    role: "counter",
    hub: "giza",
    stationRole: "Front Desk / POS",
    status: "pending",
    twoFactor: false,
    lastSeen: "Invited (Pending)",
  }),
];

export function useTeam() {
  const toast = useToast();

  const members = ref<TeamMember[]>(initialTeam());

  const filters = reactive<TeamFilters>({ role: ALL_TEAM, hub: ALL_TEAM });

  const roleCounts = computed(() => {
    const c: Record<TeamRoleKey, number> = {
      owner: 0,
      manager: 0,
      dispatcher: 0,
      counter: 0,
    };
    for (const m of members.value) c[m.role]++;
    return c;
  });

  const activeMembers = computed(() =>
    members.value.filter((m) => m.status === "active"),
  );

  const summary = computed(() => ({
    total: members.value.length,
    active: activeMembers.value.length,
    pending: members.value.length - activeMembers.value.length,
    online: activeMembers.value.filter((m) => m.isOnline).length,
    // Share of active members that have 2FA turned on
    twoFactorPercent: activeMembers.value.length
      ? Math.round(
          (activeMembers.value.filter((m) => m.twoFactor).length /
            activeMembers.value.length) *
            100,
        )
      : 100,
  }));

  /** "Cairo Almaza Hub #402 (5), …" for the busiest hubs */
  const hubBreakdown = computed(() => {
    const counts = new Map<TeamHubKey, number>();
    for (const m of activeMembers.value)
      counts.set(m.hub, (counts.get(m.hub) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([hub, n]) => `${TEAM_HUBS[hub].short} (${n})`)
      .join(", ");
  });

  const owner = computed(() => members.value.find((m) => m.role === "owner"));

  const filteredMembers = computed(() =>
    members.value.filter(
      (m) =>
        (filters.role === ALL_TEAM || m.role === filters.role) &&
        (filters.hub === ALL_TEAM || m.hub === filters.hub),
    ),
  );

  /** Terminal cards: the people assigned to each hub */
  const terminals = computed(() =>
    TEAM_TERMINALS.map((t) => {
      const staff = members.value.filter((m) => m.hub === t.hub);
      return {
        ...t,
        staffCount: staff.filter((m) => m.status === "active").length,
        avatars: staff.slice(0, 3).map((m) => m.initials),
        more: Math.max(0, staff.length - 3),
      };
    }),
  );

  // ── Bulk selection (VTable owns the checkboxes; ids persist across pages) ──
  const selectedIds = ref<(string | number)[]>([]);

  watch(filteredMembers, (list) => {
    const visible = new Set(list.map((m) => m.id));
    selectedIds.value = selectedIds.value.filter((id) => visible.has(id));
  });


  const hasActiveFilters = computed(
    () => filters.role !== ALL_TEAM || filters.hub !== ALL_TEAM,
  );

  function resetFilters() {
    filters.role = ALL_TEAM;
    filters.hub = ALL_TEAM;
  }

  // ── Actions ─────────────────────────────────────────────
  /** Returns true when the invitation was sent, so the page can close the modal */
  function inviteMember(form: InviteForm): boolean {
    const [en = "", ar = ""] = form.name.split("/").map((p) => p.trim());
    const email = form.email.trim().toLowerCase();

    if (!en) {
      toast.error("Enter the member's full name");
      return false;
    }
    if (!email.endsWith(TEAM_EMAIL_DOMAIN)) {
      toast.error(`Work email must end in ${TEAM_EMAIL_DOMAIN}`);
      return false;
    }
    if (members.value.some((m) => m.email === email)) {
      toast.error("A team member with this email already exists");
      return false;
    }

    members.value.unshift({
      id: Date.now(),
      name: en,
      arabicName: ar,
      initials: initialsOf(en),
      title: `${TEAM_ROLES[form.role].label} Specialist`,
      email,
      phone: "—",
      role: form.role,
      hub: form.hub,
      stationRole: "Station Operations",
      status: "pending",
      isOnline: false,
      lastSeen: "Invited (Pending)",
      twoFactor: form.require2FA,
    });
    toast.success(`Invitation sent to ${email}`);
    return true;
  }

  function resendInvite(m: TeamMember) {
    toast.success(`Invitation re-sent to ${m.email}`);
  }

  function removeMember(m: TeamMember) {
    members.value = members.value.filter((x) => x.id !== m.id);
    selectedIds.value = selectedIds.value.filter((id) => id !== m.id);
    toast.info(`${m.name} removed from the team`);
  }

  /** Removes every checked member except the root owner */
  function removeSelected() {
    const removable = members.value.filter(
      (m) => selectedIds.value.includes(m.id) && m.role !== "owner",
    );
    const skipped = selectedIds.value.length - removable.length;
    members.value = members.value.filter((m) => !removable.includes(m));
    selectedIds.value = [];
    toast.info(
      `${removable.length} removed from the team${skipped ? ` • ${skipped} owner kept` : ""}`,
    );
  }

  return {
    members,
    filters,
    roleCounts,
    summary,
    hubBreakdown,
    owner,
    filteredMembers,
    terminals,
    selectedIds,
    hasActiveFilters,
    resetFilters,
    removeSelected,
    inviteMember,
    resendInvite,
    removeMember,
  };
}
