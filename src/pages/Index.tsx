import { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { Categories } from "@/components/Categories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initializeGoogleAuth, signInWithGoogle } from "@/services/auth";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    initializeGoogleAuth();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setIsPlaying(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser(userData);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-white flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          {(isPlaying || showCategories) && (
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsPlaying(false);
                setShowCategories(false);
              }}
              className="flex items-center gap-2 animate-fade-in"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
          )}
          {!user && (
            <Button
              onClick={handleGoogleSignIn}
              className="bg-white text-black hover:bg-gray-100 animate-fade-in"
            >
              Google ile Giriş Yap
            </Button>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {!isPlaying && !showCategories ? (
            <div className="text-center animate-fade-in w-full max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Do or Drink
              </h1>
              {user ? (
                <>
                  <p className="text-lg mb-8 text-gray-300">
                    Hoş geldin, {user.givenName}!
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={() => setShowCategories(true)}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-lg text-lg"
                    >
                      Kategori Seç
                    </Button>
                    <Button
                      onClick={() => setIsPlaying(true)}
                      variant="outline"
                      className="w-full px-8 py-6 rounded-lg text-lg hover:bg-primary/10 transition-colors"
                    >
                      Hızlı Başla
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-lg mb-8 text-gray-300 animate-pulse">
                  Başlamak için giriş yapın
                </p>
              )}
            </div>
          ) : showCategories ? (
            <div className="w-full animate-fade-in">
              <Categories onSelectCategory={handleCategorySelect} />
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <Card category={selectedCategory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;