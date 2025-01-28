interface Translation {
  [key: string]: {
    general: {
      backProject: string;
      daysLeft: string;
      funded: string;
      createProject: string;
      signIn: string;
      signOut: string;
      loading: string;
      noProjects: string;
    };
    hero: {
      title: string;
      subtitle: string;
      projects: string;
      funded: string;
    };
    projectCard: {
      details: string;
      backProject: string;
    };
    createProject: {
      title: string;
      projectTitle: string;
      description: string;
      fundingGoal: string;
      category: string;
      imageUrl: string;
      endDate: string;
      submit: string;
      creating: string;
    };
    donate: {
      title: string;
      amount: string;
      submit: string;
      processing: string;
      securePayment: string;
    };
    categories: {
      technology: string;
      greenTech: string;
      healthcare: string;
      education: string;
      finance: string;
    };
  };
}

export const translations: Translation = {
  en: {
    general: {
      backProject: 'Back Project',
      daysLeft: 'days left',
      funded: 'Funded',
      createProject: 'Start Project',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      loading: 'Loading projects...',
      noProjects: 'No projects yet. Be the first to create one!'
    },
    hero: {
      title: 'Fund the Next Big Thing',
      subtitle: 'Support innovative startups and get rewarded',
      projects: 'Projects',
      funded: 'Funded'
    },
    projectCard: {
      details: 'Details',
      backProject: 'Back Project'
    },
    createProject: {
      title: 'Create New Project',
      projectTitle: 'Project Title',
      description: 'Description',
      fundingGoal: 'Funding Goal ($)',
      category: 'Category',
      imageUrl: 'Project Image URL',
      endDate: 'Campaign End Date',
      submit: 'Create Project',
      creating: 'Creating...'
    },
    donate: {
      title: 'Support',
      amount: 'Donation Amount ($)',
      submit: 'Donate Now',
      processing: 'Processing...',
      securePayment: 'Your donation will be processed securely via Stripe.'
    },
    categories: {
      technology: 'Technology',
      greenTech: 'Green Tech',
      healthcare: 'Healthcare',
      education: 'Education',
      finance: 'Finance'
    }
  },
  pt: {
    general: {
      backProject: 'Apoiar Projeto',
      daysLeft: 'dias restantes',
      funded: 'Financiado',
      createProject: 'Criar Projeto',
      signIn: 'Entrar',
      signOut: 'Sair',
      loading: 'Carregando projetos...',
      noProjects: 'Nenhum projeto ainda. Seja o primeiro a criar!'
    },
    hero: {
      title: 'Financie a Próxima Grande Ideia',
      subtitle: 'Apoie startups inovadoras e seja recompensado',
      projects: 'Projetos',
      funded: 'Financiado'
    },
    projectCard: {
      details: 'Detalhes',
      backProject: 'Apoiar'
    },
    createProject: {
      title: 'Criar Novo Projeto',
      projectTitle: 'Título do Projeto',
      description: 'Descrição',
      fundingGoal: 'Meta de Financiamento (R$)',
      category: 'Categoria',
      imageUrl: 'URL da Imagem do Projeto',
      endDate: 'Data Final da Campanha',
      submit: 'Criar Projeto',
      creating: 'Criando...'
    },
    donate: {
      title: 'Apoiar',
      amount: 'Valor da Doação (R$)',
      submit: 'Doar Agora',
      processing: 'Processando...',
      securePayment: 'Sua doação será processada com segurança via Stripe.'
    },
    categories: {
      technology: 'Tecnologia',
      greenTech: 'Tecnologia Verde',
      healthcare: 'Saúde',
      education: 'Educação',
      finance: 'Finanças'
    }
  },
  es: {
    general: {
      backProject: 'Apoyar Proyecto',
      daysLeft: 'días restantes',
      funded: 'Financiado',
      createProject: 'Crear Proyecto',
      signIn: 'Iniciar Sesión',
      signOut: 'Cerrar Sesión',
      loading: 'Cargando proyectos...',
      noProjects: '¡Aún no hay proyectos. ¡Sé el primero en crear uno!'
    },
    hero: {
      title: 'Financia la Próxima Gran Idea',
      subtitle: 'Apoya startups innovadoras y recibe recompensas',
      projects: 'Proyectos',
      funded: 'Financiado'
    },
    projectCard: {
      details: 'Detalles',
      backProject: 'Apoyar'
    },
    createProject: {
      title: 'Crear Nuevo Proyecto',
      projectTitle: 'Título del Proyecto',
      description: 'Descripción',
      fundingGoal: 'Meta de Financiamiento ($)',
      category: 'Categoría',
      imageUrl: 'URL de Imagen del Proyecto',
      endDate: 'Fecha Final de Campaña',
      submit: 'Crear Proyecto',
      creating: 'Creando...'
    },
    donate: {
      title: 'Apoyar',
      amount: 'Monto de Donación ($)',
      submit: 'Donar Ahora',
      processing: 'Procesando...',
      securePayment: 'Tu donación será procesada de forma segura a través de Stripe.'
    },
    categories: {
      technology: 'Tecnología',
      greenTech: 'Tecnología Verde',
      healthcare: 'Salud',
      education: 'Educación',
      finance: 'Finanzas'
    }
  }
};