import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Création d’un admin par défaut
  await prisma.user.upsert({
    where: { email: "admin@brewbuild.local" },
    update: {},
    create: {
      email: "admin@brewbuild.local",
      password: "admin123", // ⚠️ en clair juste pour test, on sécurisera plus tard
      role: "ADMIN",
      name: "Super Admin"
    },
  })
}

main()
  .then(() => {
    console.log("✅ Seed terminé avec succès")
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
