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
    "exemplar": {
      "identificacao": 1,
      "latitude": -23.371929,
      "longitude": -47.561587,
      "nm_cientifico": 'Caesalpinia pluviosa',
      "nm_comum": 'Sibipiruna',
      "endereco": 'Alameda de acesso ao prédio da administração',
      "origem_esp": 'Nativa',
      "floracao": 'Setembro a Novembro',
      "cor_flor": 'Amarela',
      "dap": 40,
      "altura": 5
    },

    "avaliacao": {
      "copa": 'Copa equilibrada, folhagem e galhos sem danos',
      "tronco": 'Ataque de brocas',
      "sistema_radicular": 'Não aparente',

      "pragas": { "presente": true },
      "fungos": { "presente": false },
      "bacterias": { "presente": false },
      "deficiencia_nutricional": { "presente": false }
    },

    "relatorios": [
      { "data": '09/2025', "descricao": 'Identificação de infestação severa de brocas' },
      { "data": '28/10/2025', "descricao": 'Aplicação de Inseticida Biologico Acta Dua' },
      { "data": '07/12/2025', "descricao": 'Infestação de brocas controlada' },
      { "data": '02/03/2026', "descricao": 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    "recomendacoes": [
      { "data": '09/2025', "descricao": 'Aplicação localizada de inseticida para brocas' },
      { "data": '02/03/2026', "descricao": 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    "fotos": ['./assets/fotos_inventario/1/1.jpg',
      './assets/fotos_inventario/1/2.jpg',
      './assets/fotos_inventario/1/3.jpg',
      './assets/fotos_inventario/1/4.jpg',
      './assets/fotos_inventario/1/5.jpg'
    ]
  },

  {
    "exemplar": {
      "identificacao": 2,
      "latitude": -23.371997,
      "longitude": -47.561497,
      "nm_cientifico": 'Caesalpinia pluviosa',
      "nm_comum": 'Sibipiruna',
      "endereco": 'Alameda de acesso ao prédio da administração',
      "origem_esp": 'Nativa',
      "floracao": 'Setembro a Novembro',
      "cor_flor": 'Amarela',
      "dap": 40,
      "altura": 5
    },

    "avaliacao": {
      "copa": 'Copa equilibrada, folhagem e galhos sem danos',
      "tronco": 'Ataque de brocas',
      "sistema_radicular": 'Não aparente',

      "pragas": { "presente": true },
      "fungos": { "presente": false },
      "bacterias": { "presente": false },
      "deficiencia_nutricional": { "presente": false }
    },

    "relatorios": [
      { "data": '09/2025', "descricao": 'Identificação de infestação severa de brocas' },
      { "data": '28/10/2025', "descricao": 'Aplicação de Inseticida Biologico Acta Dua' },
      { "data": '07/12/2025', "descricao": 'Infestação de brocas controlada' },
      { "data": '02/03/2026', "descricao": 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    "recomendacoes": [
      { "data": '09/2025', "descricao": 'Aplicação localizada de inseticida para brocas' },
      { "data": '02/03/2026', "descricao": 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    "fotos": ['./assets/fotos_inventario/2/1.jpg',
      './assets/fotos_inventario/2/2.jpg',
      './assets/fotos_inventario/2/3.jpg',
      './assets/fotos_inventario/2/4.jpg',
      './assets/fotos_inventario/2/5.jpg'
    ]
  },

  {
    "exemplar": {
      "identificacao": 3,
      "latitude": -23.372112,
      "longitude": -47.561386,
      "nm_cientifico": 'Caesalpinia pluviosa',
      "nm_comum": 'Sibipiruna',
      "endereco": 'Alameda de acesso ao prédio da administração',
      "origem_esp": 'Nativa',
      "floracao": 'Setembro a Novembro',
      "cor_flor": 'Amarela',
      "dap": 40,
      "altura": 5
    },

    "avaliacao": {
      "copa": 'Copa equilibrada, folhagem e galhos sem danos',
      "tronco": 'Ataque de brocas',
      "sistema_radicular": 'Não aparente',

      "pragas": { "presente": true },
      "fungos": { "presente": false },
      "bacterias": { "presente": false },
      "deficiencia_nutricional": { "presente": false }
    },

    "relatorios": [
      { "data": '09/2025', "descricao": 'Identificação de infestação severa de brocas' },
      { "data": '28/10/2025', "descricao": 'Aplicação de Inseticida de contato e sistêmico' },
      { "data": '07/12/2025', "descricao": 'Infestação de brocas controlada' },
      { "data": '02/03/2026', "descricao": 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    "recomendacoes": [
      { "data": '09/2025', "descricao": 'Aplicação localizada de inseticida para brocas' },
      { "data": '02/03/2026', "descricao": 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    "fotos": ['./assets/fotos_inventario/3/1.jpg',
      './assets/fotos_inventario/3/2.jpg',
      './assets/fotos_inventario/3/3.jpg',
      './assets/fotos_inventario/3/4.jpg'
    ]
  },

  {
    "exemplar": {
      "identificacao": 4,
      "latitude": -23.372176,
      "longitude": -47.561304,
      "nm_cientifico": 'Caesalpinia pluviosa',
      "nm_comum": 'Sibipiruna',
      "endereco": 'Alameda de acesso ao prédio da administração',
      "origem_esp": 'Nativa',
      "floracao": 'Setembro a Novembro',
      "cor_flor": 'Amarela',
      "dap": 40,
      "altura": 5
    },

    "avaliacao": {
      "copa": 'Copa equilibrada, folhagem e galhos sem danos',
      "tronco": 'Ataque de brocas',
      "sistema_radicular": 'Não aparente',

      "pragas": { "presente": true },
      "fungos": { "presente": false },
      "bacterias": { "presente": false },
      "deficiencia_nutricional": { "presente": false }
    },

    "relatorios": [
      { "data": '09/2025', "descricao": 'Identificação de infestação severa de brocas' },
      { "data": '28/10/2025', "descricao": 'Aplicação de Inseticida de contato e sistêmico' },
      { "data": '07/12/2025', "descricao": 'Infestação de brocas controlada' },
      { "data": '02/03/2026', "descricao": 'Nova vistoria de avaliação. Brocas controladas e presença de cochonilhas' }
    ],

    "recomendacoes": [
      { "data": '09/2025', "descricao": 'Aplicação localizada de inseticida para brocas' },
      { "data": '02/03/2026', "descricao": 'Aplicação localizada de inseticida natural para cochonilhas' }
    ],

    "fotos": ['./assets/fotos_inventario/4/1.jpg',
      './assets/fotos_inventario/4/2.jpg',
      './assets/fotos_inventario/4/3.jpg',
      './assets/fotos_inventario/4/4.jpg',
      './assets/fotos_inventario/4/5.jpg'
    ]
  },
  {
    "exemplar": {
      "identificacao": 5,
      "latitude": -23.342514,
      "longitude": -47.548586,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê",
      "endereco": "Fase 1 Quadra 02 (Proximo as Quadras da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho e Setembro",
      "cor_flor": "Rosa",
      "dap": "61",
      "altura": "06"
    },
    "avaliacao": {
      "copa": "Com algumas pintas nas folhas",
      "tronco": "Com rachaduras, casca danificada (faltando pedaço)",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Árvore esta danificada parte do tronco, esta com parte das folhas pintadas, cascas rachadas. "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/5/WhatsApp Image 2026-03-12 at 13.31.54.jpeg",
      "./assets/fotos_inventario/5/b.jpeg",
      "./assets/fotos_inventario/5/c.jpeg",
      "./assets/fotos_inventario/5/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 6,
      "latitude": -23.343649,
      "longitude": -47.548601,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê",
      "endereco": "Fase 1 Q02",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "29",
      "altura": "09"
    },
    "avaliacao": {
      "copa": "Galhos secos, folhagem com algumas pintas amareladas",
      "tronco": "Com poucas rachadura na casca ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Poucas rachaduras nas cascas, alguns galhos secos e folhas com pintas amareladas "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/6/a.jpeg",
      "./assets/fotos_inventario/6/b.jpeg",
      "./assets/fotos_inventario/6/c.jpeg",
      "./assets/fotos_inventario/6/d.jpeg",
      "./assets/fotos_inventario/6/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 7,
      "latitude": -23.34257,
      "longitude": -47.548584,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "53",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Poucos galhos secos, aparentemente folhagem saudável ",
      "tronco": "Cascas soltando em alguns pontos, ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Folhagem bem verde, galhos secos so nas pontas, poucas rachaduras na casca"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/7/a.jpeg",
      "./assets/fotos_inventario/7/b.jpeg",
      "./assets/fotos_inventario/7/c.jpeg",
      "./assets/fotos_inventario/7/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 8,
      "latitude": -23.342814,
      "longitude": -47.548593,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "41",
      "altura": "09"
    },
    "avaliacao": {
      "copa": "Fraca, folhas cheia de pintas, galhos secos e rala.",
      "tronco": "Cascas soltando, bastante musgo",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Aparenta estar fraca, com copa rala de folhagem e galhos, e alguns galhos secos e rachados"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/8/a.jpeg",
      "./assets/fotos_inventario/8/b.jpeg",
      "./assets/fotos_inventario/8/c.jpeg",
      "./assets/fotos_inventario/8/d.jpeg",
      "./assets/fotos_inventario/8/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 9,
      "latitude": -23.342947,
      "longitude": -47.548628,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo as Quadras da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "36",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos folhagem pintada ",
      "tronco": "Bastante musgo, e 1 rachadura ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Folhagem pintada, galhos secos, bastante musgo e algumas rachaduras nos galhos "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/9/a.jpeg",
      "./assets/fotos_inventario/9/b.jpeg",
      "./assets/fotos_inventario/9/c.jpeg",
      "./assets/fotos_inventario/9/d.jpeg",
      "./assets/fotos_inventario/9/e.jpeg",
      "./assets/fotos_inventario/9/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 10,
      "latitude": -23.343121,
      "longitude": -47.548679,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próxima a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "22",
      "altura": "08"
    },
    "avaliacao": {
      "copa": "Fraca, galhos secos, galhos da copa com rachaduras",
      "tronco": "Rachadura, musgo e fungos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Rachaduras, galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/10/a.jpeg",
      "./assets/fotos_inventario/10/b.jpeg",
      "./assets/fotos_inventario/10/c.jpeg",
      "./assets/fotos_inventario/10/d.jpeg",
      "./assets/fotos_inventario/10/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 11,
      "latitude": -23.433235,
      "longitude": -47.548658,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "55",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Folhas saudáveis, alguns galhos finos pro meio que estao secos.",
      "tronco": "Musgos e algumas cascas com rachaduras.",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Aparentemente saudavel, com alguns galhos finos pro meio que estao secos, alguns todos dos galhos que foram cortados."
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/11/a.jpeg",
      "./assets/fotos_inventario/11/b.jpeg",
      "./assets/fotos_inventario/11/c.jpeg",
      "./assets/fotos_inventario/11/d.jpeg",
      "./assets/fotos_inventario/11/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 12,
      "latitude": -23.343298,
      "longitude": -47.548696,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa ",
      "dap": "32",
      "altura": "08"
    },
    "avaliacao": {
      "copa": "Galhos secos, e rachados, poucas folhas e musgos ",
      "tronco": "Tronco com rachaduras, cascas soltando, e galhos cortados ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Copa fraca, com poucas folhas e as que tem estao com pintas, galhos secos, rachaduras"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/12/a.jpeg",
      "./assets/fotos_inventario/12/b.jpeg",
      "./assets/fotos_inventario/12/c.jpeg",
      "./assets/fotos_inventario/12/d.jpeg",
      "./assets/fotos_inventario/12/e.jpeg",
      "./assets/fotos_inventario/12/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 13,
      "latitude": -23.343366,
      "longitude": -47.548716,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "30",
      "altura": "08"
    },
    "avaliacao": {
      "copa": "Folhagem pintada, fora isso copa sem galhos secos e com bastabte folhas ",
      "tronco": "Fungos, musgos e algumas cascas soltando ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Folhagem com manchas escuras e pintas amareladaa"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/13/a.jpeg",
      "./assets/fotos_inventario/13/b.jpeg",
      "./assets/fotos_inventario/13/c.jpeg",
      "./assets/fotos_inventario/13/d.jpeg",
      "./assets/fotos_inventario/13/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 14,
      "latitude": -23.343472,
      "longitude": -47.548728,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo a  Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "25",
      "altura": "09"
    },
    "avaliacao": {
      "copa": "Copa pequena, percebe tocos de galhos quebrados, alguns galhos secos (copa fraca)",
      "tronco": "Com fungos e rachadura",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Arvore aparentemente fraca, copa mal formada, com rachadura e fungos "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/14/a.jpeg",
      "./assets/fotos_inventario/14/b.jpeg",
      "./assets/fotos_inventario/14/c.jpeg",
      "./assets/fotos_inventario/14/d.jpeg",
      "./assets/fotos_inventario/14/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 15,
      "latitude": -23.343665,
      "longitude": -47.548783,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 (próximo a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "44",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Cheia de folhas, pouquíssimos galhos secos, alguns galhos da copa danificados e fungos.",
      "tronco": "Bastante musgos sem rachaduras ",
      "sistema_radicular": "Aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Aparentemente saudável, alguns galhos da copa com pequenas fissuras e cascas saindo"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/15/a.jpeg",
      "./assets/fotos_inventario/15/b.jpeg",
      "./assets/fotos_inventario/15/c.jpeg",
      "./assets/fotos_inventario/15/d.jpeg",
      "./assets/fotos_inventario/15/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 16,
      "latitude": -23.343741,
      "longitude": -47.54879,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1  Q02 (próximo a Quadra da P2)",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "24",
      "altura": "06"
    },
    "avaliacao": {
      "copa": "Pequena, bastante folhas saudaveis, galhos secos e tocos de galhos quebrados/cortados",
      "tronco": "Cascas soltando e musgos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Fungos e galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/16/a.jpeg",
      "./assets/fotos_inventario/16/b.jpeg",
      "./assets/fotos_inventario/16/c.jpeg",
      "./assets/fotos_inventario/16/d.jpeg",
      "./assets/fotos_inventario/16/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 16,
      "latitude": -23.343837,
      "longitude": -47.548786,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "47",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos (uma parte), folhas com pintas ",
      "tronco": "Com fissuras e musgos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Uma parte atras esta com boa parte seca, e folhas pintadas, e tronco com uma boa parte com fissuras"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/16/a.jpeg",
      "./assets/fotos_inventario/16/b.jpeg",
      "./assets/fotos_inventario/16/c.jpeg",
      "./assets/fotos_inventario/16/d.jpeg",
      "./assets/fotos_inventario/16/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 18,
      "latitude": -23.343951,
      "longitude": -47.548778,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "25",
      "altura": "09"
    },
    "avaliacao": {
      "copa": "Poucas folhas, um lado seco e galhos rachados e com folhas pintadas ",
      "tronco": "Com rachaduras grandes, cascas soltando e tocos quebrados ou cortados e com arame amarrando orquídea de forma apertada ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Boa parte seca e com rachaduras"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/18/a.jpeg",
      "./assets/fotos_inventario/18/b.jpeg",
      "./assets/fotos_inventario/18/c.jpeg",
      "./assets/fotos_inventario/18/d.jpeg",
      "./assets/fotos_inventario/18/e.jpeg",
      "./assets/fotos_inventario/18/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 19,
      "latitude": -23.34078,
      "longitude": -47.548781,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa ",
      "dap": "31",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos poucas folhas e galhos que foi quebrados",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Galhos secos e poucas folhas "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/19/a.jpeg",
      "./assets/fotos_inventario/19/b.jpeg",
      "./assets/fotos_inventario/19/c.jpeg",
      "./assets/fotos_inventario/19/d.jpeg",
      "./assets/fotos_inventario/19/e.jpeg",
      "./assets/fotos_inventario/19/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 20,
      "latitude": -23.344129,
      "longitude": -47.548785,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "44",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Musgos, folhas amareladas na copa toda e galhos secos ",
      "tronco": "Oco de um galho q foi quebrado e musgos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Folhagem amarelada e galhos secos"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/20/a.jpeg",
      "./assets/fotos_inventario/20/b.jpeg",
      "./assets/fotos_inventario/20/c.jpeg",
      "./assets/fotos_inventario/20/d.jpeg",
      "./assets/fotos_inventario/20/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 21,
      "latitude": -23.344217,
      "longitude": -47.548806,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "41",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Folhas amareladas e bastante galhos secos ",
      "tronco": "Sem danos no tronco ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Galhos secos e folhagem amarelada"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/21/a.jpeg",
      "./assets/fotos_inventario/21/b.jpeg",
      "./assets/fotos_inventario/21/c.jpeg",
      "./assets/fotos_inventario/21/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 22,
      "latitude": -23.344326,
      "longitude": -47.548813,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "23",
      "altura": "07"
    },
    "avaliacao": {
      "copa": "Sem copa praticamente, parte central foi cortada e percebe-se que nasceu galhos na lateral e deixaram para tentar formar copa",
      "tronco": "Com rachaduras ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Fraca e com rachaduras "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/22/a.jpeg",
      "./assets/fotos_inventario/22/b.jpeg",
      "./assets/fotos_inventario/22/c.jpeg",
      "./assets/fotos_inventario/22/d.jpeg",
      "./assets/fotos_inventario/22/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 23,
      "latitude": -23.344482,
      "longitude": -47.548802,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "43",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos e poucas folhas",
      "tronco": "Com cascas saindo e toco de galhos cortados/quebrados ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Copa fraca e com galhos secos"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/23/a.jpeg",
      "./assets/fotos_inventario/23/b.jpeg",
      "./assets/fotos_inventario/23/c.jpeg",
      "./assets/fotos_inventario/23/d.jpeg",
      "./assets/fotos_inventario/23/e.jpeg",
      "./assets/fotos_inventario/23/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 24,
      "latitude": -23.344589,
      "longitude": -47.548812,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "27",
      "altura": "07"
    },
    "avaliacao": {
      "copa": "Folhagem com pintas galhos rachados e cascas dos galhos soltando",
      "tronco": "Com rachaduras ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Rachaduras e folhagem com pintas "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/24/a.jpeg",
      "./assets/fotos_inventario/24/b.jpeg",
      "./assets/fotos_inventario/24/c.jpeg",
      "./assets/fotos_inventario/24/d.jpeg",
      "./assets/fotos_inventario/24/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 25,
      "latitude": -23.344707,
      "longitude": -47.548783,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro e Novembro ",
      "cor_flor": "Amarela ",
      "dap": "67",
      "altura": "16"
    },
    "avaliacao": {
      "copa": "Saudavel ",
      "tronco": "Com cascas que soltou e com um oco no pe do tronco ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Somente tronco com algumas observações "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/25/a.jpeg",
      "./assets/fotos_inventario/25/b.jpeg",
      "./assets/fotos_inventario/25/c.jpeg",
      "./assets/fotos_inventario/25/d.jpeg",
      "./assets/fotos_inventario/25/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 26,
      "latitude": -23.344877,
      "longitude": -47.548793,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "36cn",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Saudável, com poucos galhos secos ",
      "tronco": "Com algumas rachaduras na casca",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Rachaduras e galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/26/a.jpeg",
      "./assets/fotos_inventario/26/b.jpeg",
      "./assets/fotos_inventario/26/c.jpeg",
      "./assets/fotos_inventario/26/d.jpeg",
      "./assets/fotos_inventario/26/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 27,
      "latitude": -23.344959,
      "longitude": -47.548814,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "37",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Galhos secos e folhagem bem verdes e algumas rachaduras nos galhos",
      "tronco": "Saudavel e com muitos musgos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Galhos secos e fissuras"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/27/a.jpeg",
      "./assets/fotos_inventario/27/b.jpeg",
      "./assets/fotos_inventario/27/c.jpeg",
      "./assets/fotos_inventario/27/d.jpeg",
      "./assets/fotos_inventario/27/e.jpeg",
      "./assets/fotos_inventario/27/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 28,
      "latitude": -23.345117,
      "longitude": -47.54883,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "34",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Folhagem amareladas e com pintas ",
      "tronco": "Saudável e com musgos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Folhagem amareladas "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/28/a.jpeg",
      "./assets/fotos_inventario/28/b.jpeg",
      "./assets/fotos_inventario/28/c.jpeg",
      "./assets/fotos_inventario/28/d.jpeg",
      "./assets/fotos_inventario/28/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 29,
      "latitude": -23.345206,
      "longitude": -47.548842,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "41",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Folhagem amareladas e com pintas ",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Somente folhagem da copa amareladas e com pintas"
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/29/a.jpeg",
      "./assets/fotos_inventario/29/b.jpeg",
      "./assets/fotos_inventario/29/c.jpeg",
      "./assets/fotos_inventario/29/d.jpeg",
      "./assets/fotos_inventario/29/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 30,
      "latitude": -23.345307,
      "longitude": -47.548839,
      "nm_cientifico": "Handroanthus ssp",
      "nm_comum": "Ipê ",
      "endereco": "Fase 1 Q02 ",
      "origem_esp": "Nativa",
      "floracao": "Junho a Setembro ",
      "cor_flor": "Rosa",
      "dap": "45",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Folhagem amarela e com pintas ",
      "tronco": "Com rachaduras ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "14/03/2026",
        "descricao": "Rachaduras e folhagem amareladas "
      }
    ],
    "recomendacoes": [
      {
        "data": "14/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/30/a.jpeg",
      "./assets/fotos_inventario/30/b.jpeg",
      "./assets/fotos_inventario/30/c.jpeg",
      "./assets/fotos_inventario/30/d.jpeg",
      "./assets/fotos_inventario/30/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 31,
      "latitude": -23.343106,
      "longitude": -47.555852,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 (Inicio pelo lote 1)",
      "origem_esp": "Nativa",
      "floracao": "Setembro a novembro ",
      "cor_flor": "Amarela ",
      "dap": "82",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Aparentemente saudável ",
      "tronco": "Galhos secos e cascas dos galhos soltando",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos de resto aparenta estar Saudável "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/31/a.jpeg",
      "./assets/fotos_inventario/31/b.jpeg",
      "./assets/fotos_inventario/31/c.jpeg",
      "./assets/fotos_inventario/31/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 32,
      "latitude": -23.343093,
      "longitude": -47.555805,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 (Inicio pelo lote 1)",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "70",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Saudável  somente alguns galhos secos ",
      "tronco": "Com machucados (aparentemente de caminhão que passou raspando no galho)",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos danificados com machucados "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/32/a.jpeg",
      "./assets/fotos_inventario/32/b.jpeg",
      "./assets/fotos_inventario/32/c.jpeg",
      "./assets/fotos_inventario/32/d.jpeg",
      "./assets/fotos_inventario/32/e.jpeg",
      "./assets/fotos_inventario/32/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 33,
      "latitude": -23.342973,
      "longitude": -47.55575,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "63",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Folhas bem verdes, copa bem formada (aparentemente saudável)",
      "tronco": "Possível apontamento de brocas, tocos de galhos que ja quebrou.",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Possível apontamentos de brocas"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de Inseticida para controle de brocas. Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/33/a.jpeg",
      "./assets/fotos_inventario/33/b.jpeg",
      "./assets/fotos_inventario/33/c.jpeg",
      "./assets/fotos_inventario/33/d.jpeg",
      "./assets/fotos_inventario/33/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 34,
      "latitude": -23.342824,
      "longitude": -47.555741,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "83",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Galhos secos, folhas saudáveis",
      "tronco": "Saudável (sem apontamentos a ser feito)",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem apontamentos, árvore aparentemente esta saudavel "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/34/a.jpeg",
      "./assets/fotos_inventario/34/b.jpeg",
      "./assets/fotos_inventario/34/c.jpeg",
      "./assets/fotos_inventario/34/d.jpeg",
      "./assets/fotos_inventario/34/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 35,
      "latitude": -23.34279,
      "longitude": -47.555737,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "65",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "No geral galhos secos e folhagem bem saudáveis",
      "tronco": "Aparentemente sem apontamentos a ser feito",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Árvore Saudável, há somente alguns galhos secos na copa "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/35/a.jpeg",
      "./assets/fotos_inventario/35/b.jpeg",
      "./assets/fotos_inventario/35/c.jpeg",
      "./assets/fotos_inventario/35/d.jpeg",
      "./assets/fotos_inventario/35/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 36,
      "latitude": -23.343722,
      "longitude": -47.555704,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "72",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Somente galhos secos ",
      "tronco": "Visualmente sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "No geral somente galhos secos na Copa"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/36/a.jpeg",
      "./assets/fotos_inventario/36/b.jpeg",
      "./assets/fotos_inventario/36/c.jpeg",
      "./assets/fotos_inventario/36/d.jpeg",
      "./assets/fotos_inventario/36/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 37,
      "latitude": -23.342602,
      "longitude": -47.55565,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": NaN,
      "cor_flor": "Setembro a Novembro ",
      "dap": "81",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Galhos secos e cascas dos galhos soltando ",
      "tronco": "Possíveis brocas e bem no pé tem um oco",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Possível brocas no tronco"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de Inseticida para controle de brocas"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/37/a.jpeg",
      "./assets/fotos_inventario/37/b.jpeg",
      "./assets/fotos_inventario/37/c.jpeg",
      "./assets/fotos_inventario/37/d.jpeg",
      "./assets/fotos_inventario/37/e.jpeg",
      "./assets/fotos_inventario/37/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 38,
      "latitude": -23.34256,
      "longitude": -47.555621,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "73",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos, bastante folhas ",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/38/a.jpeg",
      "./assets/fotos_inventario/38/b.jpeg",
      "./assets/fotos_inventario/38/c.jpeg",
      "./assets/fotos_inventario/38/d.jpeg",
      "./assets/fotos_inventario/38/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 39,
      "latitude": -23.342429,
      "longitude": -47.555594,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "80",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Mais rala que as outras, com poucas folhas e galhos secos ",
      "tronco": "Tronco aparentemente saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Aparentemente mais fraca que as outras"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/39/a.jpeg",
      "./assets/fotos_inventario/39/b.jpeg",
      "./assets/fotos_inventario/39/c.jpeg",
      "./assets/fotos_inventario/39/d.jpeg",
      "./assets/fotos_inventario/39/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 40,
      "latitude": -23.342359,
      "longitude": -47.55559,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "84",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "1 galho do tronco ate a ponta seco, e folhagem mais rala ",
      "tronco": "Aparentemente saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Pelas folhas mais rala aparenta estar com falta de nutrientes "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/40/a.jpeg",
      "./assets/fotos_inventario/40/b.jpeg",
      "./assets/fotos_inventario/40/c.jpeg",
      "./assets/fotos_inventario/40/d.jpeg",
      "./assets/fotos_inventario/40/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 41,
      "latitude": -23.342243,
      "longitude": -47.555532,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "65",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Alguns galhos finos secos, porém copa aparenta estar bem forte e saudável ",
      "tronco": "Cascas soltando",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Tirando galhos finos  secos aparenta estar saudáveis "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/41/a.jpeg",
      "./assets/fotos_inventario/41/b.jpeg",
      "./assets/fotos_inventario/41/c.jpeg",
      "./assets/fotos_inventario/41/d.jpeg",
      "./assets/fotos_inventario/41/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 42,
      "latitude": -23.342181,
      "longitude": -47.555481,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "60",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos fracos aparentemente e alguns secos ",
      "tronco": "Oco bem na parte central do tronco",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Árvore fraca e com \"miolo\" oco"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Substituição da espécie devido o risco eminente de queda. Base comprometida devido ao ataque de cupins/brocas. O tronco apresenta-se com fragilidade na base, pois o interior do tronco não há material lenhoso para sustentação (\"oco\"). para diminuir o risco de queda, recomenda-se uma poda drastica para redução do volume da copa"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/42/a.jpeg",
      "./assets/fotos_inventario/42/b.jpeg",
      "./assets/fotos_inventario/42/c.jpeg",
      "./assets/fotos_inventario/42/d.jpeg",
      "./assets/fotos_inventario/42/e.jpeg",
      "./assets/fotos_inventario/42/f.jpeg",
      "./assets/fotos_inventario/42/g.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 43,
      "latitude": -23.342107,
      "longitude": -47.555423,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "78",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Forte e Saudável com poucos galhos secos ",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Aparentemente saudável "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/43/a.jpeg",
      "./assets/fotos_inventario/43/b.jpeg",
      "./assets/fotos_inventario/43/c.jpeg",
      "./assets/fotos_inventario/43/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 44,
      "latitude": -23.342036,
      "longitude": -47.555361,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "70",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Galhos secos, e alguns galhos machucados ",
      "tronco": "Sem apontamentos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos e alguns machucados (como se alguem tivesse passado raspando)"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/44/a.jpeg",
      "./assets/fotos_inventario/44/b.jpeg",
      "./assets/fotos_inventario/44/c.jpeg",
      "./assets/fotos_inventario/44/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 45,
      "latitude": -23.341957,
      "longitude": -47.555333,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "71",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos e relativamente fraca",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Relativamente fraca "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/45/a.jpeg",
      "./assets/fotos_inventario/45/b.jpeg",
      "./assets/fotos_inventario/45/c.jpeg",
      "./assets/fotos_inventario/45/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 46,
      "latitude": -23.341877,
      "longitude": -47.555277,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela",
      "dap": "68",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Bem formada e com bastante folhas (poucos galhos secos)",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Saudável "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/46/a.jpeg",
      "./assets/fotos_inventario/46/b.jpeg",
      "./assets/fotos_inventario/46/c.jpeg",
      "./assets/fotos_inventario/46/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 47,
      "latitude": -23.341806,
      "longitude": -47.555219,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "73",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Galhos secos e cascas soltando ",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos e alguns galhos soltando as cascas "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/47/a.jpeg",
      "./assets/fotos_inventario/47/b.jpeg",
      "./assets/fotos_inventario/47/c.jpeg",
      "./assets/fotos_inventario/47/d.jpeg",
      "./assets/fotos_inventario/47/e.jpeg",
      "./assets/fotos_inventario/47/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 48,
      "latitude": -23.341745,
      "longitude": -47.555158,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela",
      "dap": "63",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Copa alta, porém mais fraca e com poucas folhas e galhos secos ",
      "tronco": "Relativamente saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": true
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Tronco sem apontamentos, porém é visível que ela esta mais fraca que as outras "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/48/a.jpeg",
      "./assets/fotos_inventario/48/b.jpeg",
      "./assets/fotos_inventario/48/c.jpeg",
      "./assets/fotos_inventario/48/d.jpeg",
      "./assets/fotos_inventario/48/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 49,
      "latitude": -23.341695,
      "longitude": -47.555045,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna ",
      "endereco": "Q10",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela ",
      "dap": "89",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Árvore bem formada e copa bem forte e grande, com muitas folhas ",
      "tronco": "Com possivel broca",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Tronco com possível broca"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de Inseticida para controle de brocas"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/49/a.jpeg",
      "./assets/fotos_inventario/49/b.jpeg",
      "./assets/fotos_inventario/49/c.jpeg",
      "./assets/fotos_inventario/49/d.jpeg",
      "./assets/fotos_inventario/49/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 50,
      "latitude": -23.341699,
      "longitude": -47.554983,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "60",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos e marcas de danos causado por caminhão ",
      "tronco": "Com cicatriz ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Aparentemente os únicos danos são das cicatrizes que os caminhões causam"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD,  poda de adequação de copa, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/50/a.jpeg",
      "./assets/fotos_inventario/50/b.jpeg",
      "./assets/fotos_inventario/50/c.jpeg",
      "./assets/fotos_inventario/50/d.jpeg",
      "./assets/fotos_inventario/50/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 51,
      "latitude": -23.341684,
      "longitude": -47.554858,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "75",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos e galhos com fissuras ",
      "tronco": "Saudável ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos e rachados "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/51/a.jpeg",
      "./assets/fotos_inventario/51/b.jpeg",
      "./assets/fotos_inventario/51/c.jpeg",
      "./assets/fotos_inventario/51/d.jpeg",
      "./assets/fotos_inventario/51/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 52,
      "latitude": -23.341719,
      "longitude": -47.554802,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "68",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Galhos secos e alguns machucados ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": true
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos machucados "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/52/a.jpeg",
      "./assets/fotos_inventario/52/b.jpeg",
      "./assets/fotos_inventario/52/c.jpeg",
      "./assets/fotos_inventario/52/d.jpeg",
      "./assets/fotos_inventario/52/e.jpeg",
      "./assets/fotos_inventario/52/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 53,
      "latitude": -23.341787,
      "longitude": -47.554707,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "71",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos e pendendo mais pro lado da residência e alguns galhos quebrados ",
      "tronco": "Únicos danos são as cicatrizes ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Seria mais a copa com danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": []
  },
  {
    "exemplar": {
      "identificacao": 54,
      "latitude": -23.341805,
      "longitude": -47.554622,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "55",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/54/a.jpeg",
      "./assets/fotos_inventario/54/b.jpeg",
      "./assets/fotos_inventario/54/c.jpeg",
      "./assets/fotos_inventario/54/d.jpeg",
      "./assets/fotos_inventario/54/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 55,
      "latitude": -23.341894,
      "longitude": -47.554554,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "88",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Galhos muito cascudos e alguns galhos secos ",
      "tronco": "Com um oco bem no pe da raiz e muitas cicatrizes ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Oco no tronco "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Exemplar com ataque de cupins na base do tronco. aparentemente o dano é pequeno  com possibilidade de controle. Recomenda-se aplicação de insticidade para controle do cupim e uma analise complementar da resistência da madeira com equipamento \"penetrografo\" com obejtivo de avaliar a qualiade da madeira. Além das aplicações de condicionador de solo e defensivos verdes de forma preventiva"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/55/a.jpeg",
      "./assets/fotos_inventario/55/b.jpeg",
      "./assets/fotos_inventario/55/c.jpeg",
      "./assets/fotos_inventario/55/d.jpeg",
      "./assets/fotos_inventario/55/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 56,
      "latitude": -23.341952,
      "longitude": -47.554479,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "73",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/56/a.jpeg",
      "./assets/fotos_inventario/56/b.jpeg",
      "./assets/fotos_inventario/56/c.jpeg",
      "./assets/fotos_inventario/56/d.jpeg",
      "./assets/fotos_inventario/56/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 57,
      "latitude": -23.342,
      "longitude": -47.554407,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "FASE 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "82",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Folhas um pouco amarela, galhos secos e tocos de galhos quebrados ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos  "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/57/a.jpeg",
      "./assets/fotos_inventario/57/b.jpeg",
      "./assets/fotos_inventario/57/c.jpeg",
      "./assets/fotos_inventario/57/d.jpeg",
      "./assets/fotos_inventario/57/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 58,
      "latitude": -23.342015,
      "longitude": -47.55442,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "90",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Poucos galhos secos ",
      "tronco": "Alguns furinhos, de resto ok",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/58/a.jpeg",
      "./assets/fotos_inventario/58/b.jpeg",
      "./assets/fotos_inventario/58/c.jpeg",
      "./assets/fotos_inventario/58/d.jpeg",
      "./assets/fotos_inventario/58/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 59,
      "latitude": -23.342148,
      "longitude": -47.554361,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "63",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos e tocos de galhos quebrados ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/59/a.jpeg",
      "./assets/fotos_inventario/59/b.jpeg",
      "./assets/fotos_inventario/59/c.jpeg",
      "./assets/fotos_inventario/59/d.jpeg",
      "./assets/fotos_inventario/59/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 60,
      "latitude": -23.342247,
      "longitude": -47.554325,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "80",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Tocos de galhos quebrados e galhos secos ",
      "tronco": "Unico danos são as cicatrizes ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos e tocos quebrado "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/60/a.jpeg",
      "./assets/fotos_inventario/60/b.jpeg",
      "./assets/fotos_inventario/60/c.jpeg",
      "./assets/fotos_inventario/60/d.jpeg",
      "./assets/fotos_inventario/60/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 61,
      "latitude": -23.34235,
      "longitude": -47.554342,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "78",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Poucos galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/61/a.jpeg",
      "./assets/fotos_inventario/61/b.jpeg",
      "./assets/fotos_inventario/61/c.jpeg",
      "./assets/fotos_inventario/61/d.jpeg",
      "./assets/fotos_inventario/61/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 62,
      "latitude": -23.342478,
      "longitude": -47.55258,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "71",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "1 galho grande inteiro seco e folhagem um pico amarelada",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galho inteiro seco devido a poda realizada"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/62/a.jpeg",
      "./assets/fotos_inventario/62/b.jpeg",
      "./assets/fotos_inventario/62/c.jpeg",
      "./assets/fotos_inventario/62/d.jpeg",
      "./assets/fotos_inventario/62/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 63,
      "latitude": -23.342479,
      "longitude": -47.554251,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "79",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Sem danos aparente",
      "tronco": "Sem danos aparente",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/63/a.jpeg",
      "./assets/fotos_inventario/63/b.jpeg",
      "./assets/fotos_inventario/63/c.jpeg",
      "./assets/fotos_inventario/63/d.jpeg",
      "./assets/fotos_inventario/63/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 64,
      "latitude": -23.342594,
      "longitude": -47.55422,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "53",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Sem danos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos aparente"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/64/a.jpeg",
      "./assets/fotos_inventario/64/b.jpeg",
      "./assets/fotos_inventario/64/c.jpeg",
      "./assets/fotos_inventario/64/d.jpeg",
      "./assets/fotos_inventario/64/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 65,
      "latitude": -23.342676,
      "longitude": -47.554181,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "68",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Aparenta estar mais fraca que as outras com alguns galhos secos e poucas folhas",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Relativamente mais fraca que as outras "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/65/a.jpeg",
      "./assets/fotos_inventario/65/b.jpeg",
      "./assets/fotos_inventario/65/c.jpeg",
      "./assets/fotos_inventario/65/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 66,
      "latitude": -23.342749,
      "longitude": -47.554142,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "85",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Com galhos secos, cicatrizes ",
      "tronco": "Cicatrizes e tocos de galhos quebrados ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Cicatrizes e galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/66/a.jpeg",
      "./assets/fotos_inventario/66/b.jpeg",
      "./assets/fotos_inventario/66/c.jpeg",
      "./assets/fotos_inventario/66/d.jpeg",
      "./assets/fotos_inventario/66/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 67,
      "latitude": -23.342837,
      "longitude": -47.554281,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "70",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Com toco de galho quebrado que esta ocorrendo e galhos secos com um espaçamento maior entre um galho e outro ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Oco e galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Presença de cavidade no troco merece avaliação da qualidade da madeira (pentrografo) . Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos "
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/67/a.jpeg",
      "./assets/fotos_inventario/67/b.jpeg",
      "./assets/fotos_inventario/67/c.jpeg",
      "./assets/fotos_inventario/67/d.jpeg",
      "./assets/fotos_inventario/67/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 68,
      "latitude": -23.342921,
      "longitude": -47.554088,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "60",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Tronco esta com equilíbrio mais para o lado da residência e tem alguns danos de cicatrizes ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/68/a.jpeg",
      "./assets/fotos_inventario/68/b.jpeg",
      "./assets/fotos_inventario/68/c.jpeg",
      "./assets/fotos_inventario/68/d.jpeg",
      "./assets/fotos_inventario/68/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 69,
      "latitude": -23.343013,
      "longitude": -47.554038,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "90",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Copa forte e uniforme com alguns galhos secos pendurado ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/69/a.jpeg",
      "./assets/fotos_inventario/69/b.jpeg",
      "./assets/fotos_inventario/69/c.jpeg",
      "./assets/fotos_inventario/69/d.jpeg",
      "./assets/fotos_inventario/69/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 70,
      "latitude": -23.341,
      "longitude": -47.553993,
      "nm_cientifico": "Caesalpinia pluviosa",
      "nm_comum": "Sibipiruna",
      "endereco": "Fase 1 Q10 ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Novembro ",
      "cor_flor": "Amarela",
      "dap": "73",
      "altura": "14"
    },
    "avaliacao": {
      "copa": "Sem danos ",
      "tronco": "Com possibilidade de brocas",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Possível apontamento de brocas"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de Inseticida para controle de brocas. Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/70/a.jpeg",
      "./assets/fotos_inventario/70/b.jpeg",
      "./assets/fotos_inventario/70/c.jpeg",
      "./assets/fotos_inventario/70/d.jpeg",
      "./assets/fotos_inventario/70/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 72,
      "latitude": -23.343293,
      "longitude": -47.553901,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "68",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos",
      "tronco": "Com oco no pé, e algumas cicatrizes ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Presença de oco no tronco e cicatriz aparentes "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "A presença do cavidade na base do exemplar mecere uma investigação quanto a qualidade da madeira (penetrografo). Recomenade-se aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/72/a.jpeg",
      "./assets/fotos_inventario/72/b.jpeg",
      "./assets/fotos_inventario/72/c.jpeg",
      "./assets/fotos_inventario/72/d.jpeg",
      "./assets/fotos_inventario/72/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 73,
      "latitude": -23.343345,
      "longitude": -47.553872,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "82",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Galhos secos e machucados de raspar xom caminhão.",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/73/a.jpeg",
      "./assets/fotos_inventario/73/b.jpeg",
      "./assets/fotos_inventario/73/c.jpeg",
      "./assets/fotos_inventario/73/d.jpeg",
      "./assets/fotos_inventario/73/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 74,
      "latitude": -23.343432,
      "longitude": -47.553774,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "72",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/74/a.jpeg",
      "./assets/fotos_inventario/74/b.jpeg",
      "./assets/fotos_inventario/74/c.jpeg",
      "./assets/fotos_inventario/74/d.jpeg",
      "./assets/fotos_inventario/74/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 75,
      "latitude": -23.343458,
      "longitude": -47.553788,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "70",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos baixos pro lado da residência e com alguns secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/75/a.jpeg",
      "./assets/fotos_inventario/75/b.jpeg",
      "./assets/fotos_inventario/75/c.jpeg",
      "./assets/fotos_inventario/75/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 76,
      "latitude": -23.343596,
      "longitude": -47.553749,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "67",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos fracos e com aspecto de estarem sen cascas com muitas partes secas e pouca folhas ",
      "tronco": "Danos de batidas na árvore ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Aparentemente fraca "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/76/a.jpeg",
      "./assets/fotos_inventario/76/b.jpeg",
      "./assets/fotos_inventario/76/c.jpeg",
      "./assets/fotos_inventario/76/d.jpeg",
      "./assets/fotos_inventario/76/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 77,
      "latitude": -23.343667,
      "longitude": -47.553725,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "78",
      "altura": "09"
    },
    "avaliacao": {
      "copa": "Copa nova com folhas visosas e visível que árvore plantada nao tem tanto tempo ",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Saudável "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/77/a.jpeg",
      "./assets/fotos_inventario/77/b.jpeg",
      "./assets/fotos_inventario/77/c.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 78,
      "latitude": -23.343778,
      "longitude": -47.553697,
      "nm_cientifico": "Delonix regia",
      "nm_comum": "Flamboyant ",
      "endereco": "Fase 1 Q10",
      "origem_esp": "Exótica",
      "floracao": "Outubro a Dezembro ",
      "cor_flor": "Vermelha ",
      "dap": "75",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Maior de um lado e menor do outro (aparentemente esta saudável ",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/78/a.jpeg",
      "./assets/fotos_inventario/78/b.jpeg",
      "./assets/fotos_inventario/78/c.jpeg",
      "./assets/fotos_inventario/78/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 79,
      "latitude": -23.36974,
      "longitude": -47.575762,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "30",
      "altura": "06"
    },
    "avaliacao": {
      "copa": "Folhas com pintas na oarte inferior e com aspecto de fraca ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Pintas nas folhagem "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/79/a.jpeg",
      "./assets/fotos_inventario/79/b.jpeg",
      "./assets/fotos_inventario/79/c.jpeg",
      "./assets/fotos_inventario/79/d.jpeg",
      "./assets/fotos_inventario/79/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 80,
      "latitude": -23.366992,
      "longitude": -47.575889,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "36",
      "altura": "07"
    },
    "avaliacao": {
      "copa": "Sem danos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/80/a.jpeg",
      "./assets/fotos_inventario/80/b.jpeg",
      "./assets/fotos_inventario/80/c.jpeg",
      "./assets/fotos_inventario/80/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 81,
      "latitude": -23.369704,
      "longitude": -47.575932,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "30",
      "altura": "07"
    },
    "avaliacao": {
      "copa": "Sem danos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/81/a.jpeg",
      "./assets/fotos_inventario/81/b.jpeg",
      "./assets/fotos_inventario/81/c.jpeg",
      "./assets/fotos_inventario/81/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 82,
      "latitude": -23.369705,
      "longitude": -47.576019,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "43",
      "altura": "08"
    },
    "avaliacao": {
      "copa": "Uniforme e viçosa ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/82/a.jpeg",
      "./assets/fotos_inventario/82/b.jpeg",
      "./assets/fotos_inventario/82/c.jpeg",
      "./assets/fotos_inventario/82/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 83,
      "latitude": -23.369738,
      "longitude": -47.576128,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "40",
      "altura": "06"
    },
    "avaliacao": {
      "copa": "Mais fraca que as outras, porém com folhagem aparentemente saudável ",
      "tronco": "Com rachadura",
      "sistema_radicular": "Aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Rachadura e raiz aparente "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/83/a.jpeg",
      "./assets/fotos_inventario/83/b.jpeg",
      "./assets/fotos_inventario/83/c.jpeg",
      "./assets/fotos_inventario/83/d.jpeg",
      "./assets/fotos_inventario/83/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 84,
      "latitude": -23.369742,
      "longitude": -47.576217,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "30",
      "altura": "04"
    },
    "avaliacao": {
      "copa": "Copa maior de um lado menor do outro, folhas com pequenos furos",
      "tronco": "Manchas amarelas e alguns furinhos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Folhas com furos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/84/a.jpeg",
      "./assets/fotos_inventario/84/b.jpeg",
      "./assets/fotos_inventario/84/c.jpeg",
      "./assets/fotos_inventario/84/d.jpeg",
      "./assets/fotos_inventario/84/e.jpeg",
      "./assets/fotos_inventario/84/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 85,
      "latitude": -23.369804,
      "longitude": -47.576296,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha",
      "dap": "50",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Folhas amarelando (poucas) e algumas folhas com furos ",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Copa com folhas atacadas"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/85/a.jpeg",
      "./assets/fotos_inventario/85/b.jpeg",
      "./assets/fotos_inventario/85/c.jpeg",
      "./assets/fotos_inventario/85/d.jpeg",
      "./assets/fotos_inventario/85/e.jpeg",
      "./assets/fotos_inventario/85/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 86,
      "latitude": -23.369817,
      "longitude": -47.576383,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "32",
      "altura": "06"
    },
    "avaliacao": {
      "copa": "Folhas com pintas pretas e pontas amarelas",
      "tronco": "Com fissuras",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Folhas com danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/86/a.jpeg",
      "./assets/fotos_inventario/86/b.jpeg",
      "./assets/fotos_inventario/86/c.jpeg",
      "./assets/fotos_inventario/86/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 87,
      "latitude": -23.36983,
      "longitude": -47.576464,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "25",
      "altura": "05"
    },
    "avaliacao": {
      "copa": "Não uniforme e pequena",
      "tronco": "Fino e sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos graves aparentemente fraca"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/87/a.jpeg",
      "./assets/fotos_inventario/87/b.jpeg",
      "./assets/fotos_inventario/87/c.jpeg",
      "./assets/fotos_inventario/87/d.jpeg",
      "./assets/fotos_inventario/87/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 88,
      "latitude": -23.369893,
      "longitude": -47.576519,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "52",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Forte e bem formada exceto as folhas que estão com furos",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/88/a.jpeg",
      "./assets/fotos_inventario/88/b.jpeg",
      "./assets/fotos_inventario/88/c.jpeg",
      "./assets/fotos_inventario/88/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 89,
      "latitude": -23.36989,
      "longitude": -47.576651,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "48",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Sem danos",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/89/a.jpeg",
      "./assets/fotos_inventario/89/b.jpeg",
      "./assets/fotos_inventario/89/c.jpeg",
      "./assets/fotos_inventario/89/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 90,
      "latitude": -23.369943,
      "longitude": -47.576739,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "42",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Folhas começando a amarelar ",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/90/a.jpeg",
      "./assets/fotos_inventario/90/b.jpeg",
      "./assets/fotos_inventario/90/c.jpeg",
      "./assets/fotos_inventario/90/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 91,
      "latitude": -23.369949,
      "longitude": -47.576845,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "63",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Com furos nas folhas, porém bem formada",
      "tronco": "Com machucados e cascas rachando e arame amarrando orquídea ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Tronco com danos e folhas com furos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/91/a.jpeg",
      "./assets/fotos_inventario/91/b.jpeg",
      "./assets/fotos_inventario/91/c.jpeg",
      "./assets/fotos_inventario/91/d.jpeg",
      "./assets/fotos_inventario/91/e.jpeg",
      "./assets/fotos_inventario/91/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 92,
      "latitude": -23.370036,
      "longitude": -47.576953,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "40",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Sem danos e bem formada",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Aparentemente saudável "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/92/a.jpeg",
      "./assets/fotos_inventario/92/b.jpeg",
      "./assets/fotos_inventario/92/c.jpeg",
      "./assets/fotos_inventario/92/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 93,
      "latitude": -23.370037,
      "longitude": -47.577017,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "39",
      "altura": "07"
    },
    "avaliacao": {
      "copa": "Sem danos",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/93/a.jpeg",
      "./assets/fotos_inventario/93/b.jpeg",
      "./assets/fotos_inventario/93/c.jpeg",
      "./assets/fotos_inventario/93/d.jpeg",
      "./assets/fotos_inventario/93/e.jpeg",
      "./assets/fotos_inventario/93/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 94,
      "latitude": -23.370048,
      "longitude": -47.577116,
      "nm_cientifico": "Bombax ceiba",
      "nm_comum": "Paineira Vermelha indiana",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Exótica",
      "floracao": "Junho a Agosto",
      "cor_flor": "Vermelha ",
      "dap": "42",
      "altura": "09"
    },
    "avaliacao": {
      "copa": "Sem danos ",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/94/a.jpeg",
      "./assets/fotos_inventario/94/b.jpeg",
      "./assets/fotos_inventario/94/c.jpeg",
      "./assets/fotos_inventario/94/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 95,
      "latitude": -23.370152,
      "longitude": -47.577181,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela",
      "dap": "78",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Alguns galhos secos",
      "tronco": "Cascas soltando",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Cascas e galhos secos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/95/a.jpeg",
      "./assets/fotos_inventario/95/b.jpeg",
      "./assets/fotos_inventario/95/c.jpeg",
      "./assets/fotos_inventario/95/d.jpeg",
      "./assets/fotos_inventario/95/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 96,
      "latitude": -23.370181,
      "longitude": -47.577224,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "78",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem dano",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/96/a.jpeg",
      "./assets/fotos_inventario/96/b.jpeg",
      "./assets/fotos_inventario/96/c.jpeg",
      "./assets/fotos_inventario/96/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 97,
      "latitude": -23.370241,
      "longitude": -47.577273,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "65",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/97/a.jpeg",
      "./assets/fotos_inventario/97/b.jpeg",
      "./assets/fotos_inventario/97/c.jpeg",
      "./assets/fotos_inventario/97/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 98,
      "latitude": -23.370301,
      "longitude": -47.577305,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "66",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Forte e sem danos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/98/a.jpeg",
      "./assets/fotos_inventario/98/b.jpeg",
      "./assets/fotos_inventario/98/c.jpeg",
      "./assets/fotos_inventario/98/d.jpeg",
      "./assets/fotos_inventario/98/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 99,
      "latitude": -23.370425,
      "longitude": -47.577279,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "68",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Sem danos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/99/a.jpeg",
      "./assets/fotos_inventario/99/b.jpeg",
      "./assets/fotos_inventario/99/c.jpeg",
      "./assets/fotos_inventario/99/d.jpeg",
      "./assets/fotos_inventario/99/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 100,
      "latitude": -23.370523,
      "longitude": -47.577313,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela",
      "dap": "68",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/100/a.jpeg",
      "./assets/fotos_inventario/100/b.jpeg",
      "./assets/fotos_inventario/100/c.jpeg",
      "./assets/fotos_inventario/100/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 101,
      "latitude": -23.370599,
      "longitude": -47.577359,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela",
      "dap": "70",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Poucos galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Galhos secos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/101/a.jpeg",
      "./assets/fotos_inventario/101/b.jpeg",
      "./assets/fotos_inventario/101/c.jpeg",
      "./assets/fotos_inventario/101/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 102,
      "latitude": -23.370616,
      "longitude": -47.577362,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela",
      "dap": "78",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Cascas soltando",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Cascas soltando nos troncos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/102/a.jpeg",
      "./assets/fotos_inventario/102/b.jpeg",
      "./assets/fotos_inventario/102/c.jpeg",
      "./assets/fotos_inventario/102/d.jpeg",
      "./assets/fotos_inventario/102/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 103,
      "latitude": -23.370734,
      "longitude": -47.577443,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "76",
      "altura": "12"
    },
    "avaliacao": {
      "copa": "Sem danos",
      "tronco": "Galhos secos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/103/a.jpeg",
      "./assets/fotos_inventario/103/b.jpeg",
      "./assets/fotos_inventario/103/c.jpeg",
      "./assets/fotos_inventario/103/d.jpeg",
      "./assets/fotos_inventario/103/f.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 104,
      "latitude": -23.370819,
      "longitude": -47.577501,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "82",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/104/a.jpeg",
      "./assets/fotos_inventario/104/b.jpeg",
      "./assets/fotos_inventario/104/c.jpeg",
      "./assets/fotos_inventario/104/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 105,
      "latitude": -23.37689,
      "longitude": -47.577578,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "69",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Galhos secos ",
      "tronco": "Orquídea amarradas com arame  ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/105/a.jpeg",
      "./assets/fotos_inventario/105/b.jpeg",
      "./assets/fotos_inventario/105/c.jpeg",
      "./assets/fotos_inventario/105/d.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 106,
      "latitude": -23.370957,
      "longitude": -47.5777604,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "68",
      "altura": "11"
    },
    "avaliacao": {
      "copa": "Sem danos",
      "tronco": "Sem danos",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/106/a.jpeg",
      "./assets/fotos_inventario/106/b.jpeg",
      "./assets/fotos_inventario/106/c.jpeg",
      "./assets/fotos_inventario/106/d.jpeg",
      "./assets/fotos_inventario/106/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 107,
      "latitude": -23.371044,
      "longitude": -47.577635,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia ",
      "endereco": "Fase 4 QG ",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "75",
      "altura": "10"
    },
    "avaliacao": {
      "copa": "Alguns galhos secos ",
      "tronco": "Soltando cascas e orquídea amarrada com arame ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Cascas soltando"
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/107/a.jpeg",
      "./assets/fotos_inventario/107/b.jpeg",
      "./assets/fotos_inventario/107/c.jpeg",
      "./assets/fotos_inventario/107/d.jpeg",
      "./assets/fotos_inventario/107/e.jpeg"
    ]
  },
  {
    "exemplar": {
      "identificacao": 108,
      "latitude": -23.371138,
      "longitude": -47.577678,
      "nm_cientifico": "Acacia ssp",
      "nm_comum": "Acácia",
      "endereco": "Fase 4 QG",
      "origem_esp": "Nativa",
      "floracao": "Setembro a Fevereiro",
      "cor_flor": "Amarela ",
      "dap": "80",
      "altura": "13"
    },
    "avaliacao": {
      "copa": "Bastante galhos secos ",
      "tronco": "Sem danos ",
      "sistema_radicular": "Não aparente",
      "pragas": {
        "presente": false
      },
      "fungos": {
        "presente": false
      },
      "bacterias": {
        "presente": false
      },
      "deficiencia_nutricional": {
        "presente": false
      }
    },
    "relatorios": [
      {
        "data": "20/03/2026",
        "descricao": "Sem danos "
      }
    ],
    "recomendacoes": [
      {
        "data": "20/03/2026",
        "descricao": "Aplicação de condicionador de solo ZOLD, poda de prevenção e limpeza, adubação de solo e Aplicação de defesivos verdes como preventivo entrada de patógenos"
      }
    ],
    "fotos": [
      "./assets/fotos_inventario/108/a.jpeg",
      "./assets/fotos_inventario/108/b.jpeg",
      "./assets/fotos_inventario/108/c.jpeg",
      "./assets/fotos_inventario/108/d.jpeg",
      "./assets/fotos_inventario/108/e.jpeg"
    ]
  }

];