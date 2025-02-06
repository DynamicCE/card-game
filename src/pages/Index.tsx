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
    <div className="min-h-screen bg-background text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {(isPlaying || showCategories) && (
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsPlaying(false);
                setShowCategories(false);
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
          )}
          {!user && (
            <Button
              onClick={handleGoogleSignIn}
              className="bg-white text-black hover:bg-gray-100"
            >
              Google ile Giriş Yap
            </Button>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          {!isPlaying && !showCategories ? (
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-8 text-primary">Do or Drink</h1>
              {user ? (
                <>
                  <p className="text-lg mb-8 text-gray-300">
                    Hoş geldin, {user.givenName}!
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={() => setShowCategories(true)}
                      className="w-full bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg text-lg transition-colors"
                    >
                      Kategori Seç
                    </Button>
                    <Button
                      onClick={() => setIsPlaying(true)}
                      variant="outline"
                      className="w-full px-8 py-4 rounded-lg text-lg"
                    >
                      Hızlı Başla
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-lg mb-8 text-gray-300">
                  Başlamak için giriş yapın
                </p>
              )}
            </div>
          ) : showCategories ? (
            <Categories onSelectCategory={handleCategorySelect} />
          ) : (
            <Card category={selectedCategory} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;