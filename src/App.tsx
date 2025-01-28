import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, Users, DollarSign, Search, Settings, LogIn } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';
import ProjectCard from './components/ProjectCard';
import CreateProjectModal from './components/CreateProjectModal';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import LanguageSelector from './components/LanguageSelector';
import CurrencyDisplay from './components/CurrencyDisplay';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    fetchProjects();
    
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.email === 'joaopedroseibel1050@gmail.com';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">StartupFund</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={(lang) => setLanguage(lang)}
              />
              {user ? (
                <>
                  {isAdmin && (
                    <button
                      onClick={() => setShowAdmin(true)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    {t.general.createProject}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    {t.general.signOut}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  {t.general.signIn}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold">{t.hero.title}</h2>
            <p className="mt-4 text-xl">{t.hero.subtitle}</p>
            <div className="mt-8 flex justify-center space-x-8">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8" />
                <p className="mt-2 text-2xl font-bold">{projects.length}+</p>
                <p className="text-indigo-200">{t.hero.projects}</p>
              </div>
              <div className="flex flex-col items-center">
                <DollarSign className="h-8 w-8" />
                <p className="mt-2 text-2xl font-bold">
                  <CurrencyDisplay
                    amount={projects.reduce((acc, proj) => acc + (proj.raised || 0), 0)}
                    language={language}
                  />
                </p>
                <p className="text-indigo-200">{t.hero.funded}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t.general.loading}</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">{t.general.noProjects}</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateProjectModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onProjectCreated={fetchProjects}
        language={language}
        t={t}
      />
      <AdminDashboard show={showAdmin} onClose={() => setShowAdmin(false)} />
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}

export default App;