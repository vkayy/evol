-- CreateTable
CREATE TABLE "custom_event_type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "evolutionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_event_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "custom_event_type" ADD CONSTRAINT "custom_event_type_evolutionId_fkey" FOREIGN KEY ("evolutionId") REFERENCES "evolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
