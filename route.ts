import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("📥 Received survey submission:", data)

    // ✅ Validation (email is required)
    if (!data.userId || !data.email) {
      throw new Error("Missing required userId or email.")
    }

    const newSurvey = await prisma.survey.create({
      data: {
        userId: data.userId,  // MUST be a plain string
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        dateOfBirth: new Date(data.dateOfBirth),

        typeOfCancer: data.typeOfCancer,
        dateOfDiagnosis: new Date(data.dateOfDiagnosis),
        dateTreatmentEnded: new Date(data.dateTreatmentEnded),
        treatmentsReceived: data.treatmentsReceived,
        otherTreatments: data.otherTreatments,

        physicalHealth: data.physicalHealth ?? "",
        symptoms: data.symptoms ?? [],
        physicalActivity: data.physicalActivity ?? "",
        physicalConcerns: data.physicalConcerns ?? "",

        emotionalWellbeing: data.emotionalWellbeing ?? "",
        emotionalSymptoms: data.emotionalSymptoms ?? [],
        supportSystem: data.supportSystem ?? "",
        emotionalConcerns: data.emotionalConcerns ?? "",

        diet: data.diet,
        sleepQuality: data.sleepQuality,
        recoveryGoals: data.recoveryGoals ?? [],
        additionalInfo: data.additionalInfo ?? "",

        smokingStatus: data.smokingStatus,
        alcoholUse: data.alcoholUse,
        riskStratification: data.riskStratification,
        cardiovascularRisk: data.cardiovascularRisk,
        fertilityConcern: data.fertilityConcern,
        copingStyle: data.copingStyle,
        ptsdFlag: data.ptsdFlag,
        cognitiveFunctionScore: data.cognitiveFunctionScore,

        careCoordinationScore: data.careCoordinationScore,
        lifestyleChangeEffort: data.lifestyleChangeEffort,
        fearOfRecurrenceScore: data.fearOfRecurrenceScore,
        noSignificantIssues: data.noSignificantIssues,
        stress: data.stress,
        lateEffectSymptoms: data.lateEffectSymptoms ?? "",
      }
    })

    return Response.json(newSurvey, { status: 201 })
  } catch (error) {
    console.error("❌ Error saving survey:", error)
    return new Response(JSON.stringify({
      error: 'Survey creation failed',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : '',
      receivedPayload: await request.json()
    }), { status: 500 })
  }
}
