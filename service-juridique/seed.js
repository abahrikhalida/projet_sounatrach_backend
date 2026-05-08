/**
 * seed.js — Peuple Direction + Departement uniquement
 * Usage: node seed.js
 */
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose    = require('mongoose');
const Direction   = require('./models/Direction');
const Departement = require('./models/Departement');

const data = [
  {
    code: 'DC',
    nom:  'Direction Contrats',
    description: 'Gestion et suivi des contrats',
    departements: [
      { code: 'DC-CONT', nom: 'Département Contrats',               description: 'Rédaction et suivi des contrats' },
      { code: 'DC-AC',   nom: 'Département Assistance et Conseils', description: 'Assistance juridique et conseils' },
      { code: 'DC-DL',   nom: 'Département Dépôt Légal',            description: 'Gestion du dépôt légal' },
    ],
  },
  {
    code: 'DRD',
    nom:  'Direction Règlement des Différends',
    description: 'Règlement amiable et judiciaire des différends',
    departements: [
      { code: 'DRD-CI',   nom: 'Département Contentieux Interne',       description: 'Traitement des contentieux internes' },
      { code: 'DRD-CINT', nom: 'Département Contentieux International', description: 'Traitement des contentieux internationaux' },
      { code: 'DRD-AL',   nom: 'Département Analyses des Litiges',      description: 'Analyse et suivi des litiges' },
    ],
  },
  {
    code: 'DER',
    nom:  'Direction Études et Réglementation',
    description: 'Veille juridique, études et réglementation',
    departements: [
      { code: 'DER-AJ',   nom: 'Département Analyses Juridiques',                          description: 'Analyses et avis juridiques' },
      { code: 'DER-RVJ',  nom: 'Département Réglementation et Veille Juridique',           description: 'Veille réglementaire' },
      { code: 'DER-SJOP', nom: 'Département Suivi Juridique des Opérations Patrimoniales', description: 'Suivi juridique des opérations patrimoniales' },
    ],
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connecté\n');

  await Direction.deleteMany({});
  await Departement.deleteMany({});
  console.log('🗑️  Collections nettoyées\n');

  for (const item of data) {
    const { departements, ...dirData } = item;
    const dir = await Direction.create(dirData);
    console.log(`📁 ${dir.nom}`);
    for (const dep of departements) {
      await Departement.create({ ...dep, direction: dir._id });
      console.log(`   └── ${dep.nom}`);
    }
  }

  console.log('\n✅ Seed terminé !');
  await mongoose.connection.close();
};

run().catch(err => { console.error('❌', err.message); process.exit(1); });