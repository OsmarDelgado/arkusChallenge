-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_teamId_fkey";

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "teamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
