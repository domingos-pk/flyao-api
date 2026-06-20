-- CreateTable
CREATE TABLE "verification_otps" (
    "id" UUID NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "userId" UUID NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "verification_otps_phone_idx" ON "verification_otps"("phone");

-- CreateIndex
CREATE INDEX "verification_otps_userId_idx" ON "verification_otps"("userId");

-- AddForeignKey
ALTER TABLE "verification_otps" ADD CONSTRAINT "verification_otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
