import { z } from "zod";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});


export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ])
});

// interface HealthCheckEntry extends BaseEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }

const OccupationalHealthcareEntry =  BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date()
  }).optional()
});

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: {
//     startDate: string;
//     endDate: string;
//   }
// }

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
});

// interface HospitalEntry extends BaseEntry {
//   type: "Hospital";
//   discharge: {
//     date: string;
//     criteria: string;
//   }
// }

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntry,
  HospitalEntrySchema
]);
export type Entry = z.infer<typeof EntrySchema>;
export const NewEntryPatientSchema = z.discriminatedUnion("type", [HealthCheckEntrySchema.omit({ id: true }), OccupationalHealthcareEntry.omit({ id: true }), HospitalEntrySchema.omit({ id: true })]);
export type NewEntry = z.infer<typeof NewEntryPatientSchema>;


// export interface PatientEntry {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: string;
//   occupation: string;
// }

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});


export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
  entries?: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

// export const HealthCheckEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("HealthCheck"),
//   healthCheckRating: HealthCheckRatingSchema,
// });

// // OccupationalHealthcareEntry Schema
// export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("OccupationalHealthcare"),
//   employerName: z.string(),
//   sickLeave: z
//     .object({
//       startDate: z.string().date(),
//       endDate: z.string().date(),
//     })
//     .optional(),
// });

// // HospitalEntry Schema
// export const HospitalEntrySchema = BaseEntrySchema.extend({
//   type: z.literal("Hospital"),
//   discharge: z.object({
//     date: z.string().date(),
//     criteria: z.string(),
//   }),
// });


// export const EntrySchema = z.discriminatedUnion("type", [
//   HealthCheckEntrySchema,
//   OccupationalHealthcareEntrySchema,
//   HospitalEntrySchema,
// ]);

// // Exportar los tipos inferidos de Zod
// export type Entry = z.infer<typeof EntrySchema>;
// export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
// export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
// export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;