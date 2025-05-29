export type ColumnKey =
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "city"
  | "registeredDate"
  | "fullName"
  | "dsr";

export const DEFAULT_COLUMNS: ColumnKey[] = [
  "id",
  "firstName",
  "lastName",
  "email",
  "city",
  "registeredDate",
  "fullName",
  "dsr",
];

export const columnLabels: Record<ColumnKey, string> = {
  id: "ID",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  city: "City",
  registeredDate: "Registered Date",
  fullName: "Full Name",
  dsr: "DSR (Days Since Registration)",
};
