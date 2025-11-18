export const exemplarMock = {
  exemplar: {
    gid: 1257,
    nm_cientifico: 'Handroanthus albus',
    nm_comum: 'Ipê Amarelo',
    endereco: 'Av. Brasil, 1500 – Jardim Central',
    origem_esp: 'Nativa',
    floracao: 'Agosto a Setembro'
  },

  avaliacoes: [
    {
      data: new Date(2022, 8, 10),
      dap: 18,
      altura: 7.2,
      status_copa: 'Boa',
      status_tronco: 'Boa',
      status_radicular: 'Sem alterações',
      pragas: { sim: false },
      fungos: { sim: false },
      bacterias: { sim: false },
      def_nutricional: { sim: false },
      fotos: [
        'https://picsum.photos/seed/arvore_2022_1/600/400',
        'https://picsum.photos/seed/arvore_2022_2/600/400'
      ]
    },
    {
      data: new Date(2023, 6, 22),
      dap: 19.4,
      altura: 7.6,
      status_copa: 'Regular',
      status_tronco: 'Boa',
      status_radicular: 'Com compactação leve',
      pragas: { sim: true, desc: 'Ataque inicial de pulgões' },
      fungos: { sim: false },
      bacterias: { sim: false },
      def_nutricional: { sim: false },
      fotos: [
        'https://picsum.photos/seed/arvore_2023_1/600/400',
        'https://picsum.photos/seed/arvore_2023_2/600/400',
        'https://picsum.photos/seed/arvore_2023_3/600/400'
      ]
    },
    {
      data: new Date(2024, 4, 15),
      dap: 20.1,
      altura: 8.1,
      status_copa: 'Muito boa',
      status_tronco: 'Boa',
      status_radicular: 'Sem alterações',
      pragas: { sim: false },
      fungos: { sim: true, desc: 'Manchas foliares leves' },
      bacterias: { sim: false },
      def_nutricional: { sim: true, desc: 'Clorose leve nas folhas jovens' },
      fotos: [
        'https://picsum.photos/seed/arvore_2024_1/600/400',
        'https://picsum.photos/seed/arvore_2024_2/600/400'
      ]
    }
  ],

  recomendacoes: [
    { nivel: 1, texto: 'Monitorar sinais de clorose nas folhas jovens.' },
    { nivel: 2, texto: 'Aplicar tratamento biológico contra fungos caso aumente a incidência.' },
    { nivel: 3, texto: 'Rever compactação do solo na próxima avaliação.' }
  ]
};
