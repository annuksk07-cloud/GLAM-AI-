
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UploadSelection from './components/UploadSelection';
import CameraView from './components/CameraView';
import PhotoPreview from './components/PhotoPreview';
import ConsentView from './components/ConsentView';
import ProgressView from './components/ProgressView';
import AnalysisView from './components/AnalysisView';
import TutorialPlayer from './components/TutorialPlayer';
import HaircutGallery from './components/HaircutGallery';
import MakeupSelectionView from './components/MakeupSelectionView';
import SettingsView from './components/SettingsView';
import LegalView from './components/LegalView';
import WeddingDressSelection from './components/WeddingDressSelection';
import GlobalDressDesigner from './components/GlobalDressDesigner';
import DressPreview from './components/DressPreview';
import StylistPreview from './components/StylistPreview';
import PersonalityStylistQA from './components/PersonalityStylistQA';
import PersonalityStylistResults from './components/PersonalityStylistResults';
import PersonalityStylistFinal from './components/PersonalityStylistFinal';
import { ThemeType, FaceAnalysis, MakeupStep, Occasion, CountryStyle, HaircutStyle, ViewState, Language, WeddingDress, StylistLook, PersonalityStylistData } from './types';
import { analyzeFace, analyzeFullBody, generateMakeupTutorial, generateTutorialStepImage, generateHaircutVisualization, generateDressTryOn, generateStylistDescriptions, generateStylistLook, generatePersonalityRecommendations, generateFinalLookImage } from './services/geminiService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.DARK);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FaceAnalysis | null>(null);
  const [tutorialSteps, setTutorialSteps] = useState<MakeupStep[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('DAILY');
  const [selectedCountry, setSelectedCountry] = useState<CountryStyle>('INDIA');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [originalBase64, setOriginalBase64] = useState<string | null>(null);
  
  const [selectedHaircut, setSelectedHaircut] = useState<HaircutStyle | null>(null);
  const [generatedHaircutImage, setGeneratedHaircutImage] = useState<string | null>(null);
  const [haircutUploadMode, setHaircutUploadMode] = useState(false);

  const [selectedDress, setSelectedDress] = useState<Partial<WeddingDress> | null>(null);
  const [generatedDressImage, setGeneratedDressImage] = useState<string | null>(null);
  const [dressUploadMode, setDressUploadMode] = useState(false);
  const [designerUploadMode, setDesignerUploadMode] = useState(false);

  const [stylistLooks, setStylistLooks] = useState<StylistLook[]>([]);
  const [stylistUploadMode, setStylistUploadMode] = useState(false);
  const [fullBodyAnalysis, setFullBodyAnalysis] = useState<any>(null);

  const [personalityData, setPersonalityData] = useState<PersonalityStylistData | null>(null);
  const [personalityUploadMode, setPersonalityUploadMode] = useState(false);
  const [finalPersonalityImage, setFinalPersonalityImage] = useState<string | null>(null);

  useEffect(() => {
    const cachedAnalysis = localStorage.getItem('glam_ai_last_analysis');
    const cachedImage = localStorage.getItem('glam_ai_last_image');
    const cachedTheme = localStorage.getItem('glam_ai_theme');
    const cachedLang = localStorage.getItem('glam_ai_lang');

    if (cachedAnalysis && cachedImage) {
      try {
        setAnalysis(JSON.parse(cachedAnalysis));
        setCapturedImage(cachedImage);
        setOriginalBase64(cachedImage.split(',')[1]);
      } catch (e) {
        localStorage.removeItem('glam_ai_last_analysis');
      }
    }
    if (cachedTheme) setTheme(cachedTheme as ThemeType);
    if (cachedLang) setLanguage(cachedLang as Language);
  }, []);

  const handleThemeChange = (t: ThemeType) => {
    setTheme(t);
    localStorage.setItem('glam_ai_theme', t);
  };

  const handleLanguageChange = (l: Language) => {
    setLanguage(l);
    localStorage.setItem('glam_ai_lang', l);
  };

  const resetUploadModes = () => {
    setHaircutUploadMode(false);
    setDressUploadMode(false);
    setStylistUploadMode(false);
    setPersonalityUploadMode(false);
    setDesignerUploadMode(false);
  };

  const handleStartAnalysis = () => {
    resetUploadModes();
    setView('MAKEUP_SELECTION');
  };

  const handleStartHaircuts = () => {
    resetUploadModes();
    setView('HAIRCUTS');
  };

  const handleStartWeddingDresses = () => {
    resetUploadModes();
    setView('WEDDING_DRESS_SELECTION');
  };

  const handleStartDesigner = () => {
    resetUploadModes();
    setView('GLOBAL_DRESS_DESIGNER');
  };

  const handleStartStylist = () => {
    resetUploadModes();
    setStylistUploadMode(true);
    setSelectedOccasion('STYLIST');
    setView('UPLOAD_SELECTION');
  };

  const handleStartPersonality = () => {
    resetUploadModes();
    setPersonalityUploadMode(true);
    setSelectedOccasion('PERSONALITY_STYLIST');
    setView('UPLOAD_SELECTION');
  };

  const handleSelectMethod = (method: 'CAMERA' | 'GALLERY' | 'FILE') => {
    if (method === 'CAMERA') {
      setView('CAMERA');
    } else {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            setCapturedImage(event.target.result);
            setOriginalBase64(event.target.result.split(',')[1]);
            setView('PREVIEW');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  };

  const handleCapture = (base64: string) => {
    const fullData = `data:image/jpeg;base64,${base64}`;
    setCapturedImage(fullData);
    setOriginalBase64(base64);
    setView('PREVIEW');
  };

  const handleConfirmPreview = () => {
    if (haircutUploadMode && selectedHaircut && originalBase64) {
      handleVisualizeHaircut(selectedHaircut);
    } else if ((dressUploadMode || designerUploadMode) && selectedDress && originalBase64) {
      handleVisualizeDress(selectedDress as WeddingDress);
    } else if (stylistUploadMode && originalBase64) {
      handleGenerateStylist();
    } else if (personalityUploadMode && originalBase64) {
      setView('PERSONALITY_STYLIST_QA');
    } else {
      setView('CONSENT');
    }
  };

  const handleAgreeConsent = async () => {
    if (!originalBase64) return;
    setView('PROGRESS');
    try {
      const result = await analyzeFace(originalBase64);
      setAnalysis(result);
      localStorage.setItem('glam_ai_last_analysis', JSON.stringify(result));
      if (capturedImage) localStorage.setItem('glam_ai_last_image', capturedImage);
      setView('ANALYSIS');
    } catch (err: any) {
      console.error("Analysis failed:", err);
      alert("Analysis failed: " + (err.message || err.toString()));
      setView('DASHBOARD');
    }
  };

  const handleProceedToTutorial = async () => {
    if (!analysis || !originalBase64) return;
    setLoading(true);
    try {
      const steps = await generateMakeupTutorial(analysis, selectedOccasion, selectedCountry);
      const firstStepImg = await generateTutorialStepImage(originalBase64, steps[0], "No previous steps");
      steps[0].generatedImageUrl = firstStepImg || undefined;
      setTutorialSteps(steps);
      setView('TUTORIAL');
    } catch (err: any) {
      console.error("Tutorial generation failed:", err);
      alert("Failed to generate tutorial: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  const fetchStepImage = async (stepIndex: number) => {
    if (!originalBase64 || !tutorialSteps[stepIndex] || tutorialSteps[stepIndex].generatedImageUrl) return;
    try {
      const previousStepsNames = tutorialSteps.slice(0, stepIndex).map(s => s.name).join(', ') || "No previous steps";
      const img = await generateTutorialStepImage(originalBase64, tutorialSteps[stepIndex], previousStepsNames);
      setTutorialSteps(prev => {
        const updated = [...prev];
        updated[stepIndex].generatedImageUrl = img || undefined;
        return updated;
      });
    } catch (err: any) {
      console.error("Failed to fetch step image:", err);
    }
  };

  const handleVisualizeHaircut = async (style: HaircutStyle) => {
    if (!originalBase64) {
      setSelectedHaircut(style);
      resetUploadModes();
      setHaircutUploadMode(true);
      setView('UPLOAD_SELECTION');
      return;
    }
    setLoading(true);
    setGeneratedHaircutImage(null);
    try {
      const img = await generateHaircutVisualization(originalBase64, style);
      setGeneratedHaircutImage(img);
      setSelectedHaircut(style);
      setView('HAIRCUTS');
    } catch (err: any) {
      console.error("Haircut visualization failed:", err);
      alert("Visualization failed: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  const handleVisualizeDress = async (dress: Partial<WeddingDress>) => {
    if (!originalBase64) {
      setSelectedDress(dress);
      const isDesigner = view === 'GLOBAL_DRESS_DESIGNER';
      resetUploadModes();
      if (isDesigner) setDesignerUploadMode(true);
      else setDressUploadMode(true);
      setView('UPLOAD_SELECTION');
      return;
    }

    setLoading(true);
    setGeneratedDressImage(null);
    try {
      const skinToneHex = analysis?.intelligence?.skinToneHex || '#D4A574';
      const img = await generateDressTryOn(originalBase64, dress as WeddingDress, skinToneHex);
      setGeneratedDressImage(img);
      setSelectedDress(dress);
      setView('DRESS_PREVIEW');
    } catch (err: any) {
      console.error("Dress visualization failed:", err);
      alert("Try-on failed: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateStylist = async () => {
    if (!originalBase64) return;
    setLoading(true);
    try {
      const bodyAnalysis = await analyzeFullBody(originalBase64);
      setFullBodyAnalysis(bodyAnalysis);
      const looks = await generateStylistDescriptions(bodyAnalysis);
      setStylistLooks(looks);
      setView('STYLIST_PREVIEW');
      const firstImg = await generateStylistLook(originalBase64, looks[0], bodyAnalysis);
      setStylistLooks(prev => {
        const updated = [...prev];
        updated[0].imageUrl = firstImg || undefined;
        return updated;
      });
    } catch (err: any) {
      console.error("Stylist generation failed:", err);
      alert("Stylist failed: " + (err.message || err.toString()));
      setView('DASHBOARD');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalityQA = async (answers: string[]) => {
    if (!originalBase64) return;
    setLoading(true);
    try {
      const bodyAnalysis = await analyzeFullBody(originalBase64);
      setFullBodyAnalysis(bodyAnalysis);
      const recommendations = await generatePersonalityRecommendations(bodyAnalysis, answers);
      setPersonalityData(recommendations);
      setView('PERSONALITY_STYLIST_RESULTS');
    } catch (err: any) {
      console.error("Personality styling failed:", err);
      alert("Personality styling failed: " + (err.message || err.toString()));
      setView('DASHBOARD');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalPersonalitySelection = async (selections: string[]) => {
    if (!originalBase64 || !fullBodyAnalysis) return;
    setLoading(true);
    try {
      const finalImg = await generateFinalLookImage(originalBase64, selections, fullBodyAnalysis);
      setFinalPersonalityImage(finalImg);
      setView('PERSONALITY_STYLIST_FINAL');
    } catch (err: any) {
      console.error("Final render failed:", err);
      alert("Final render failed: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (v: ViewState | 'START_STYLIST' | 'START_PERSONALITY' | 'START_DESIGNER') => {
    if (v === 'START_STYLIST') handleStartStylist();
    else if (v === 'START_PERSONALITY') handleStartPersonality();
    else if (v === 'START_DESIGNER') handleStartDesigner();
    else setView(v);
  };

  return (
    <Layout theme={theme} onThemeChange={handleThemeChange} onNavigate={handleNavigate} language={language}>
      {loading && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold animate-pulse">GLAM AI Rendering Look...</p>
        </div>
      )}

      {view === 'DASHBOARD' && (
        <Dashboard 
          onStartAnalysis={handleStartAnalysis}
          onStartHaircuts={handleStartHaircuts}
          onStartWeddingDresses={handleStartWeddingDresses}
          onStartPersonality={handleStartPersonality}
          onStartDesigner={handleStartDesigner}
          language={language}
        />
      )}

      {view === 'SETTINGS' && (
        <SettingsView 
          currentTheme={theme}
          onThemeChange={handleThemeChange}
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
          onNavigate={setView}
        />
      )}

      {view === 'GLOBAL_DRESS_DESIGNER' && (
        <GlobalDressDesigner 
          onVisualize={handleVisualizeDress}
          onClose={() => setView('DASHBOARD')}
        />
      )}

      {view === 'WEDDING_DRESS_SELECTION' && (
        <WeddingDressSelection 
          onSelect={handleVisualizeDress as (dress: WeddingDress) => void}
          onClose={() => setView('DASHBOARD')}
        />
      )}

      {view === 'DRESS_PREVIEW' && selectedDress && generatedDressImage && (
        <DressPreview 
          image={generatedDressImage}
          dress={selectedDress as WeddingDress}
          onClose={() => setView(designerUploadMode ? 'GLOBAL_DRESS_DESIGNER' : 'WEDDING_DRESS_SELECTION')}
        />
      )}

      {view === 'STYLIST_PREVIEW' && stylistLooks.length > 0 && (
        <StylistPreview looks={stylistLooks} onClose={() => setView('DASHBOARD')} />
      )}

      {view === 'PERSONALITY_STYLIST_QA' && (
        <PersonalityStylistQA onSubmit={handlePersonalityQA} onClose={() => setView('DASHBOARD')} />
      )}

      {view === 'PERSONALITY_STYLIST_RESULTS' && personalityData && (
        <PersonalityStylistResults data={personalityData} onFinish={handleFinalPersonalitySelection} onClose={() => setView('DASHBOARD')} />
      )}

      {view === 'PERSONALITY_STYLIST_FINAL' && finalPersonalityImage && (
        <PersonalityStylistFinal image={finalPersonalityImage} onRetry={() => setView('PERSONALITY_STYLIST_RESULTS')} onClose={() => setView('DASHBOARD')} />
      )}

      {view === 'PRIVACY' && <LegalView type="PRIVACY" onBack={() => setView('SETTINGS')} />}
      {view === 'TERMS' && <LegalView type="TERMS" onBack={() => setView('SETTINGS')} />}
      {view === 'SECURITY' && <LegalView type="SECURITY" onBack={() => setView('SETTINGS')} />}

      {view === 'MAKEUP_SELECTION' && (
        <MakeupSelectionView 
          onSelectOccasion={(occ) => {
            if (occ === 'PERSONALITY_STYLIST') handleStartPersonality();
            else if (occ === 'STYLIST') handleStartStylist();
            else { setSelectedOccasion(occ); setView('UPLOAD_SELECTION'); }
          }}
          onSelectCountry={(country) => { setSelectedCountry(country); setView('UPLOAD_SELECTION'); }}
        />
      )}

      {view === 'UPLOAD_SELECTION' && (
        <UploadSelection onSelect={handleSelectMethod} onClose={() => setView('DASHBOARD')} />
      )}

      {view === 'CAMERA' && <CameraView onCapture={handleCapture} onClose={() => setView('UPLOAD_SELECTION')} />}

      {view === 'PREVIEW' && capturedImage && <PhotoPreview image={capturedImage} onConfirm={handleConfirmPreview} onRetake={() => setView('UPLOAD_SELECTION')} />}

      {view === 'CONSENT' && <ConsentView onAgree={handleAgreeConsent} onDisagree={() => setView('UPLOAD_SELECTION')} />}

      {view === 'PROGRESS' && <ProgressView />}

      {view === 'ANALYSIS' && analysis && <AnalysisView analysis={analysis} onProceed={handleProceedToTutorial} onBack={() => setView('DASHBOARD')} />}

      {view === 'TUTORIAL' && <TutorialPlayer steps={tutorialSteps} onComplete={() => setView('DASHBOARD')} onLoadStepImage={fetchStepImage} originalPhoto={capturedImage || ''} analysis={analysis} />}

      {view === 'HAIRCUTS' && <HaircutGallery onVisualize={handleVisualizeHaircut} generatedImage={generatedHaircutImage} originalPhoto={capturedImage || ''} selectedStyle={selectedHaircut} onReset={() => { setGeneratedHaircutImage(null); setSelectedHaircut(null); }} analysis={analysis} />}
    </Layout>
  );
};

export default App;
