import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase environment variables. Define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const chapters = [
  {
    title: 'O Fio Invisível',
    slug: 'o-fio-invisivel',
    chapter_order: 1,
    keyword: 'Fio',
    theme: 'Conexões humanas',
    summary: 'Sobre os laços que sustentam pessoas mesmo quando ninguém está olhando.',
    reading_time: 4,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Existe um fio que ninguém vê e que, mesmo assim, sustenta tudo.

Ele começa em um gesto pequeno: um bom-dia dito com atenção, uma porta segurada, um nome pronunciado corretamente. Coisas mínimas, quase invisíveis, que costuram a distância entre duas pessoas.

Aprendi a observar esse fio nas salas de espera, nos ônibus lotados, nos corredores onde ninguém se apresenta. Há sempre alguém segurando a ponta. Há sempre alguém esperando que a outra ponta seja puxada.

O que chamamos de coincidência talvez seja apenas o fio se tensionando. Duas vidas que se aproximam porque, em algum ponto anterior, alguém decidiu não cortar o que unia.

Quando o fio se rompe, o mundo não faz barulho. Apenas fica um pouco mais frio. E é por isso que insisto: sustente o seu lado. Alguém do outro lado está fazendo o mesmo.`,
  },
  {
    title: 'Ruído Branco',
    slug: 'ruido-branco',
    chapter_order: 2,
    keyword: 'Silêncio',
    theme: 'Excesso e escuta',
    summary: 'O que resta quando desligamos o barulho que usamos para não nos ouvir.',
    reading_time: 5,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Passei anos confundindo silêncio com ausência.

Preenchia cada intervalo: música no caminho, vídeo no almoço, voz alheia antes de dormir. Um ruído branco constante, macio o suficiente para não incomodar e alto o suficiente para não me deixar pensar.

Até que uma noite a energia caiu. Sem tela, sem som, sem fuga. E ali, no escuro, o que apareceu não foi paz — foi tudo que eu havia adiado.

Descobri que o silêncio não é vazio. É um espaço com formato próprio, onde as coisas que evitamos finalmente cabem.

Hoje procuro esse espaço de propósito. Poucos minutos, sem nada tocando. É desconfortável. É necessário. É a única sala em que consigo escutar minha própria voz sem edição.`,
  },
  {
    title: 'A Casa que me Habita',
    slug: 'a-casa-que-me-habita',
    chapter_order: 3,
    keyword: 'Casa',
    theme: 'Memória e pertencimento',
    summary: 'Um retorno à arquitetura afetiva das primeiras paredes.',
    reading_time: 4,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Toda casa guarda o som de quem morou nela.

A minha guardava o rangido da terceira tábua, o chiado da panela às seis da tarde, o rádio ligado num volume que ninguém escutava de verdade. Eu achava que eu morava na casa. Levei tempo para entender que ela também mora em mim.

Mudei de endereço muitas vezes. Levei objetos, deixei móveis, perdi caixas. Mas nunca consegui deixar o cheiro da chuva batendo naquele quintal específico.

Pertencer não é ocupar um espaço. É ser ocupado por ele.

Por isso, quando alguém me pergunta de onde eu sou, penso menos em cidade e mais em cozinha, corredor, luz da tarde entrando torta pela janela.`,
  },
  {
    title: 'Vozes Emprestadas',
    slug: 'vozes-emprestadas',
    chapter_order: 4,
    keyword: 'Voz',
    theme: 'Identidade',
    summary: 'Sobre a lenta descoberta de qual voz, entre tantas, é a nossa.',
    reading_time: 6,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Antes de ter voz, eu tinha ecos.

Falava com as palavras do meu pai, com o tom da professora, com o humor dos amigos que eu admirava. Era uma colagem convincente. Funcionava tão bem que quase ninguém percebia — nem eu.

O problema dos ecos é que eles não respondem perguntas novas. Quando a vida trouxe algo que ninguém ao meu redor tinha vivido, o repertório emprestado silenciou.

Foi ali que precisei improvisar. E o som que saiu era estranho, desafinado, sem apoio de ninguém. Era meu.

Ter voz não é falar bonito. É reconhecer, no meio de mil frases possíveis, aquela que só você diria daquele jeito.`,
  },
  {
    title: 'O Peso da Pressa',
    slug: 'o-peso-da-pressa',
    chapter_order: 5,
    keyword: 'Tempo',
    theme: 'Presença',
    summary: 'A conta que a velocidade cobra depois, sempre em silêncio.',
    reading_time: 4,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `A pressa não corre. Ela acumula.

Cada coisa feita pela metade fica guardada em algum canto, esperando cobrança. A conversa atravessada. O almoço engolido. O abraço dado com o corpo já virado para a porta.

Durante muito tempo chamei isso de produtividade. Era só dívida.

O tempo não se recupera com mais velocidade — se recupera com atenção. Cinco minutos inteiros valem mais que uma hora dividida em quinze telas.

Hoje, quando me pego acelerando sem destino, faço uma pergunta simples: o que exatamente estou tentando alcançar antes de mim mesmo?`,
  },
  {
    title: 'Cicatriz',
    slug: 'cicatriz',
    chapter_order: 6,
    keyword: 'Marca',
    theme: 'Superação',
    summary: 'O corpo escreve o que a memória tenta resumir.',
    reading_time: 5,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Cicatriz é a forma que o corpo encontrou de dizer: eu estava aqui e continuei.

Ela não desfaz o corte. Não devolve a pele antiga. Faz algo mais honesto — constrói um tecido novo, ligeiramente diferente, resistente exatamente no lugar onde antes havia falha.

Aprendi a não pedir desculpas pelas minhas. As visíveis explicam quedas. As invisíveis explicam escolhas.

Existe uma pressa cultural em parecer intacto. Como se a ausência de marcas fosse prova de virtude. Mas ninguém atravessa nada sem registro.

Quem sobreviveu tem textura. E textura, ao contrário do que dizem, é uma forma de beleza.`,
  },
  {
    title: 'Janela para Dentro',
    slug: 'janela-para-dentro',
    chapter_order: 7,
    keyword: 'Janela',
    theme: 'Autoconhecimento',
    summary: 'Toda paisagem observada por muito tempo começa a nos observar de volta.',
    reading_time: 5,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Fiquei um inverno inteiro olhando pela mesma janela.

No começo eu via a rua: o padeiro abrindo às cinco, a mulher do casaco vermelho, o cachorro que atravessava sem olhar. Depois de algumas semanas, comecei a ver outra coisa — o que eu escolhia notar.

Notava sempre os que estavam sozinhos. Notava sempre quem parecia atrasado. A janela não mudou; o que ela revelava era o meu recorte.

Talvez seja assim com tudo. Julgamos que estamos descrevendo o mundo quando estamos apenas descrevendo o nosso ângulo.

Desde então, quando algo me incomoda demais em alguém, faço uma pausa. Verifico se estou olhando pela janela ou para o reflexo dela.`,
  },
  {
    title: 'Vozes da Vida',
    slug: 'vozes-da-vida',
    chapter_order: 8,
    keyword: 'Vida',
    theme: 'Encerramento',
    summary: 'O capítulo final reúne todas as vozes que atravessaram o livro.',
    reading_time: 6,
    cover_image: null,
    is_published: true,
    published_at: new Date().toISOString(),
    content: `Este livro nasceu de palavras soltas.

Cada texto começou com um termo simples — fio, silêncio, casa, voz, tempo, marca, janela — e a tarefa era única: escutar o que aquela palavra tinha a dizer quando ninguém a interrompia.

O que apareceu não foram definições. Foram vozes. Pessoas que eu conheci, versões antigas de mim, conversas que só aconteceram na minha cabeça e, ainda assim, mudaram alguma coisa.

Talvez seja isso que chamamos de vida: um conjunto de tramas ocultas, funcionando por baixo do visível, dando sentido ao que parecia aleatório.

Se você chegou até aqui, agora há mais uma voz nesse conjunto. A sua.

Obrigado por atravessar comigo.`,
  },
];

const { data, error } = await supabase
  .from('chapters')
  .upsert(chapters, { onConflict: 'slug', ignoreDuplicates: false });

if (error) {
  throw error;
}

console.log(`Inserted or updated ${data?.length ?? chapters.length} chapters in Supabase.`);
