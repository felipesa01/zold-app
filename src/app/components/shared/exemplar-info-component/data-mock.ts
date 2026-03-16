// export const exemplarMock = {
//   exemplar: {
//     gid: 1257,
//     nm_cientifico: 'Handroanthus albus',
//     nm_comum: 'Ipê Amarelo',
//     endereco: 'Av. Brasil, 1500 – Jardim Central',
//     origem_esp: 'Nativa',
//     floracao: 'Agosto a Setembro'
//   },

//   avaliacoes: [
//     {
//       data: new Date(2022, 8, 10),
//       dap: 18,
//       altura: 7.2,
//       status_copa: 'Boa',
//       status_tronco: 'Boa',
//       status_radicular: 'Sem alterações',
//       pragas: { sim: false },
//       fungos: { sim: false },
//       bacterias: { sim: false },
//       def_nutricional: { sim: false },
//       fotos: [
//         'https://picsum.photos/seed/arvore_2022_1/600/400',
//         'https://picsum.photos/seed/arvore_2022_2/600/400'
//       ]
//     },
//     {
//       data: new Date(2023, 6, 22),
//       dap: 19.4,
//       altura: 7.6,
//       status_copa: 'Regular',
//       status_tronco: 'Boa',
//       status_radicular: 'Com compactação leve',
//       pragas: { sim: true, desc: 'Ataque inicial de pulgões' },
//       fungos: { sim: false },
//       bacterias: { sim: false },
//       def_nutricional: { sim: false },
//       fotos: [
//         'https://picsum.photos/seed/arvore_2023_1/600/400',
//         'https://picsum.photos/seed/arvore_2023_2/600/400',
//         'https://picsum.photos/seed/arvore_2023_3/600/400'
//       ]
//     },
//     {
//       data: new Date(2024, 4, 15),
//       dap: 20.1,
//       altura: 8.1,
//       status_copa: 'Muito boa',
//       status_tronco: 'Boa',
//       status_radicular: 'Sem alterações',
//       pragas: { sim: false },
//       fungos: { sim: true, desc: 'Manchas foliares leves' },
//       bacterias: { sim: false },
//       def_nutricional: { sim: true, desc: 'Clorose leve nas folhas jovens' },
//       fotos: [
//         'https://picsum.photos/seed/arvore_2024_1/600/400',
//         'https://picsum.photos/seed/arvore_2024_2/600/400'
//       ]
//     }
//   ],

//   recomendacoes: [
//     { nivel: 1, texto: 'Monitorar sinais de clorose nas folhas jovens.' },
//     { nivel: 2, texto: 'Aplicar tratamento biológico contra fungos caso aumente a incidência.' },
//     { nivel: 3, texto: 'Rever compactação do solo na próxima avaliação.' }
//   ]
// };


export const exemplaresMock = [

  {
    exemplar: {
      identificacao: 1,
      latitude: -23.371929,
      longitude: -47.561587,
      nm_cientifico: 'Caesalpinia pluviosa',
      nm_comum: 'Sibipiruna',
      endereco: 'Alameda de acesso ao prédio da administração',
      origem_esp: 'Nativa',
      floracao: 'Setembro a Novembro',
      cor_flor: 'Amarela',
      dap: 40,
      altura: 5
    },

    avaliacao: {
      copa: 'Copa equilibrada, folhagem e galhos sem danos',
      tronco: 'Ataque de brocas',
      sistema_radicular: 'Não aparente',

      pragas: { presente: true },
      fungos: { presente: false },
      bacterias: { presente: false },
      deficiencia_nutricional: { presente: false }
    },

    relatorios: [
      { data: '09/2025', descricao: 'Identificação de infestação severa de brocas' },
      { data: '28/10/2025', descricao: 'Aplicação de Inseticida Biologico Acta Dua' },
      { data: '07/12/2025', descricao: 'Infestação de brocas controlada' },
      { data: '02/03/2026', descricao: 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    recomendacoes: [
      { data: '09/2025', descricao: 'Aplicação localizada de inseticida para brocas' },
      { data: '02/03/2026', descricao: 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    fotos: ['./assets/fotos_inventario/1/1.jpg',
      './assets/fotos_inventario/1/2.jpg',
      './assets/fotos_inventario/1/3.jpg',
      './assets/fotos_inventario/1/4.jpg',
      './assets/fotos_inventario/1/5.jpg'
    ]
  },

  {
    exemplar: {
      identificacao: 2,
      latitude: -23.371997,
      longitude: -47.561497,
      nm_cientifico: 'Caesalpinia pluviosa',
      nm_comum: 'Sibipiruna',
      endereco: 'Alameda de acesso ao prédio da administração',
      origem_esp: 'Nativa',
      floracao: 'Setembro a Novembro',
      cor_flor: 'Amarela',
      dap: 40,
      altura: 5
    },

    avaliacao: {
      copa: 'Copa equilibrada, folhagem e galhos sem danos',
      tronco: 'Ataque de brocas',
      sistema_radicular: 'Não aparente',

      pragas: { presente: true },
      fungos: { presente: false },
      bacterias: { presente: false },
      deficiencia_nutricional: { presente: false }
    },

    relatorios: [
      { data: '09/2025', descricao: 'Identificação de infestação severa de brocas' },
      { data: '28/10/2025', descricao: 'Aplicação de Inseticida Biologico Acta Dua' },
      { data: '07/12/2025', descricao: 'Infestação de brocas controlada' },
      { data: '02/03/2026', descricao: 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    recomendacoes: [
      { data: '09/2025', descricao: 'Aplicação localizada de inseticida para brocas' },
      { data: '02/03/2026', descricao: 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    fotos: ['./assets/fotos_inventario/2/1.jpg',
      './assets/fotos_inventario/2/2.jpg',
      './assets/fotos_inventario/2/3.jpg',
      './assets/fotos_inventario/2/4.jpg',
      './assets/fotos_inventario/2/5.jpg'
    ]
  },

  {
    exemplar: {
      identificacao: 3,
      latitude: -23.372112,
      longitude: -47.561386,
      nm_cientifico: 'Caesalpinia pluviosa',
      nm_comum: 'Sibipiruna',
      endereco: 'Alameda de acesso ao prédio da administração',
      origem_esp: 'Nativa',
      floracao: 'Setembro a Novembro',
      cor_flor: 'Amarela',
      dap: 40,
      altura: 5
    },

    avaliacao: {
      copa: 'Copa equilibrada, folhagem e galhos sem danos',
      tronco: 'Ataque de brocas',
      sistema_radicular: 'Não aparente',

      pragas: { presente: true },
      fungos: { presente: false },
      bacterias: { presente: false },
      deficiencia_nutricional: { presente: false }
    },

    relatorios: [
      { data: '09/2025', descricao: 'Identificação de infestação severa de brocas' },
      { data: '28/10/2025', descricao: 'Aplicação de Inseticida de contato e sistêmico' },
      { data: '07/12/2025', descricao: 'Infestação de brocas controlada' },
      { data: '02/03/2026', descricao: 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    recomendacoes: [
      { data: '09/2025', descricao: 'Aplicação localizada de inseticida para brocas' },
      { data: '02/03/2026', descricao: 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    fotos: ['./assets/fotos_inventario/3/1.jpg',
      './assets/fotos_inventario/3/2.jpg',
      './assets/fotos_inventario/3/3.jpg',
      './assets/fotos_inventario/3/4.jpg'
    ]
  },

  {
    exemplar: {
      identificacao: 4,
      latitude: -23.372176,
      longitude: -47.561304,
      nm_cientifico: 'Caesalpinia pluviosa',
      nm_comum: 'Sibipiruna',
      endereco: 'Alameda de acesso ao prédio da administração',
      origem_esp: 'Nativa',
      floracao: 'Setembro a Novembro',
      cor_flor: 'Amarela',
      dap: 40,
      altura: 5
    },

    avaliacao: {
      copa: 'Copa equilibrada, folhagem e galhos sem danos',
      tronco: 'Ataque de brocas',
      sistema_radicular: 'Não aparente',

      pragas: { presente: true },
      fungos: { presente: false },
      bacterias: { presente: false },
      deficiencia_nutricional: { presente: false }
    },

    relatorios: [
      { data: '09/2025', descricao: 'Identificação de infestação severa de brocas' },
      { data: '28/10/2025', descricao: 'Aplicação de Inseticida de contato e sistêmico' },
      { data: '07/12/2025', descricao: 'Infestação de brocas controlada' },
      { data: '02/03/2026', descricao: 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    recomendacoes: [
      { data: '09/2025', descricao: 'Aplicação localizada de inseticida para brocas' },
      { data: '02/03/2026', descricao: 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    fotos: ['./assets/fotos_inventario/4/1.jpg',
      './assets/fotos_inventario/4/2.jpg',
      './assets/fotos_inventario/4/3.jpg',
      './assets/fotos_inventario/4/4.jpg',
      './assets/fotos_inventario/4/5.jpg'
    ]
  }

];