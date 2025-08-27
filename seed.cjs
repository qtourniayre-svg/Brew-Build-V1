const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main(){
  const brewery = await prisma.brewery.create({
    data: { name: 'Demo Brewery', timezone: 'Europe/Paris' }
  })
  const hash = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@brewbuild.local', password: hash, role: 'ADMIN',
      firstName: 'Admin', lastName: 'User', breweryId: brewery.id
    }
  })
  console.log('✅ Seed terminé — Admin: admin@brewbuild.local / admin123')
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect())
