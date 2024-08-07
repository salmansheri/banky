import prisma from "../db";

export async function createBankAccount({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) {
  try {
    const bankAccount = await prisma.bankAccount.create({
      data: {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      },
    });

    return bankAccount;
  } catch (error) {}
}
