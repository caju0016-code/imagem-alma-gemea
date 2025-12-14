"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Moon, Stars, Download, Share2 } from "lucide-react";

type UserData = {
  name: string;
  gender: string;
  birthDate: string;
  belief: string;
  attraction: string;
  qualities: string[];
  appearance: string;
  bodyType: string;
  face: string;
  style: string;
  meeting: string;
  feeling: string;
  scenario: string;
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    gender: "",
    birthDate: "",
    belief: "",
    attraction: "",
    qualities: [],
    appearance: "",
    bodyType: "",
    face: "",
    style: "",
    meeting: "",
    feeling: "",
    scenario: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageUnlocked, setImageUnlocked] = useState(false);

  const updateData = (key: keyof UserData, value: string | string[]) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleQuality = (quality: string) => {
    const current = userData.qualities;
    if (current.includes(quality)) {
      updateData(
        "qualities",
        current.filter((q) => q !== quality)
      );
    } else if (current.length < 5) {
      updateData("qualities", [...current, quality]);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);

    // Construir prompt baseado nas respostas
    const genderMap: Record<string, string> = {
      homem: "handsome man",
      mulher: "beautiful woman",
      ambos: userData.gender === "mulher" ? "handsome man" : "beautiful woman",
    };

    const appearanceMap: Record<string, string> = {
      suave: "soft and delicate features",
      forte: "strong and striking features",
      elegante: "elegant and refined appearance",
      misteriosa: "mysterious and intense look",
    };

    const bodyMap: Record<string, string> = {
      atletico: "athletic build",
      forte: "strong and robust physique",
      esguio: "slender and lean body",
      natural: "natural and average build",
    };

    const faceMap: Record<string, string> = {
      profundo: "deep, soulful eyes",
      sorriso: "warm, captivating smile",
      seria: "serious and strong expression",
      delicado: "gentle and calm face",
    };

    const styleMap: Record<string, string> = {
      casual: "casual, natural clothing",
      elegante: "elegant, well-dressed attire",
      moderno: "modern, trendy style",
      classico: "classic, timeless fashion",
    };

    const scenarioMap: Record<string, string> = {
      praia: "beach at sunset, golden hour, warm orange and pink sky, ocean waves",
      montanhas: "snowy mountains, winter landscape, soft white snow, mountain peaks",
      casamento: "wedding venue, romantic setting, elegant decoration, dreamy atmosphere",
      quarto: "romantic bedroom, intimate setting, soft lighting, cozy atmosphere",
    };

    const feelingMap: Record<string, string> = {
      calma: "calm and secure energy, peaceful aura",
      emocao: "intense emotion, passionate energy",
      amor: "warm loving presence, nurturing aura",
      desejo: "deep connection, magnetic presence",
    };

    const spiritualTone =
      userData.belief === "sim" || userData.belief === "talvez"
        ? "ethereal, spiritual glow, cosmic connection"
        : "realistic, natural";

    const prompt = `Ultra-realistic portrait photography of a ${
      genderMap[userData.attraction]
    }, ${appearanceMap[userData.appearance]}, ${bodyMap[userData.bodyType]}, ${
      faceMap[userData.face]
    }, ${styleMap[userData.style]}, ${scenarioMap[userData.scenario]}, ${
      feelingMap[userData.feeling]
    }, ${spiritualTone}, professional photography, 8k quality, cinematic lighting, shallow depth of field, romantic atmosphere`;

    try {
      const response = await fetch("/api/generate-soulmate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userData }),
      });

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setStep(14);
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      alert("Erro ao gerar sua alma gêmea. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return userData.name.trim() !== "";
      case 2:
        return userData.gender !== "";
      case 3:
        return userData.birthDate !== "";
      case 4:
        return userData.belief !== "";
      case 5:
        return userData.attraction !== "";
      case 6:
        return userData.qualities.length > 0;
      case 7:
        return userData.appearance !== "";
      case 8:
        return userData.bodyType !== "";
      case 9:
        return userData.face !== "";
      case 10:
        return userData.style !== "";
      case 11:
        return userData.meeting !== "";
      case 12:
        return userData.feeling !== "";
      case 13:
        return userData.scenario !== "";
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <div className="relative">
                <Moon className="w-24 h-24 text-purple-400 animate-pulse" />
                <Stars className="w-12 h-12 text-yellow-300 absolute -top-2 -right-2 animate-spin-slow" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Descubra Sua Alma Gêmea
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Uma jornada mística de 12 perguntas que revelará a imagem da
              pessoa destinada a você
            </p>
            <Button
              onClick={() => setStep(1)}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2" />
              Iniciar Jornada
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-300">
                1️⃣ Qual é o seu nome?
              </h2>
              <p className="text-gray-400 italic">
                Queremos que essa experiência seja só sua.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg text-gray-300">
                Seu nome
              </Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => updateData("name", e.target.value)}
                placeholder="Digite seu nome..."
                className="bg-gray-800/50 border-purple-500/30 text-white text-lg py-6 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-300">
                2️⃣ Com qual gênero você se identifica?
              </h2>
              <p className="text-gray-400 italic">
                Serve para personalizar a narrativa
              </p>
            </div>
            <RadioGroup
              value={userData.gender}
              onValueChange={(value) => updateData("gender", value)}
              className="space-y-4"
            >
              {["Mulher", "Homem", "Outro / Prefiro não dizer"].map(
                (option) => (
                  <div
                    key={option}
                    className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-purple-500/20 hover:border-purple-500/50"
                  >
                    <RadioGroupItem
                      value={option.toLowerCase()}
                      id={option}
                      className="border-purple-500"
                    />
                    <Label
                      htmlFor={option}
                      className="text-lg text-gray-200 cursor-pointer flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                )
              )}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-300">
                3️⃣ Qual é sua data de nascimento?
              </h2>
              <p className="text-gray-400 italic">
                Cada alma carrega uma energia única.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-lg text-gray-300">
                Data de nascimento
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={userData.birthDate}
                onChange={(e) => updateData("birthDate", e.target.value)}
                className="bg-gray-800/50 border-purple-500/30 text-white text-lg py-6 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-300">
                4️⃣ Você acredita que almas podem se reencontrar em outras
                vidas?
              </h2>
              <p className="text-gray-400 italic">
                Define o tom espiritual da experiência
              </p>
            </div>
            <RadioGroup
              value={userData.belief}
              onValueChange={(value) => updateData("belief", value)}
              className="space-y-4"
            >
              {[
                "Sim, com certeza",
                "Talvez… sinto que sim",
                "Não tenho certeza",
                "Não acredito",
              ].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-purple-500/20 hover:border-purple-500/50"
                >
                  <RadioGroupItem
                    value={option.toLowerCase().split(",")[0]}
                    id={option}
                    className="border-purple-500"
                  />
                  <Label
                    htmlFor={option}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-300">
                5️⃣ Você sente atração por qual gênero?
              </h2>
              <p className="text-gray-400 italic">
                Define o gênero da imagem final
              </p>
            </div>
            <RadioGroup
              value={userData.attraction}
              onValueChange={(value) => updateData("attraction", value)}
              className="space-y-4"
            >
              {["Homem", "Mulher", "Ambos"].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-purple-500/20 hover:border-purple-500/50"
                >
                  <RadioGroupItem
                    value={option.toLowerCase()}
                    id={option}
                    className="border-purple-500"
                  />
                  <Label
                    htmlFor={option}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-purple-300">
                6️⃣ O que você mais procura em{" "}
                {userData.attraction === "homem"
                  ? "um homem"
                  : userData.attraction === "mulher"
                  ? "uma mulher"
                  : "alguém"}
                ?
              </h2>
              <p className="text-gray-400 italic">Escolha até 5 opções</p>
            </div>
            <div className="space-y-3">
              {[
                "Proteção",
                "Carinho",
                "Intensidade",
                "Companheirismo",
                "Mistério",
                "Estabilidade",
                "Paixão",
              ].map((quality) => (
                <div
                  key={quality}
                  onClick={() => toggleQuality(quality.toLowerCase())}
                  className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all border ${
                    userData.qualities.includes(quality.toLowerCase())
                      ? "bg-purple-500/20 border-purple-500"
                      : "bg-gray-800/30 border-purple-500/20 hover:bg-gray-800/50 hover:border-purple-500/50"
                  }`}
                >
                  <Checkbox
                    checked={userData.qualities.includes(quality.toLowerCase())}
                    className="border-purple-500"
                  />
                  <Label className="text-lg text-gray-200 cursor-pointer flex-1">
                    {quality}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-pink-300">
                🔮 Agora começamos a moldar a aparência
              </h2>
              <h3 className="text-2xl font-semibold text-purple-300">
                7️⃣ Qual dessas aparências mais te atrai?
              </h3>
            </div>
            <RadioGroup
              value={userData.appearance}
              onValueChange={(value) => updateData("appearance", value)}
              className="space-y-4"
            >
              {[
                { label: "Aparência suave e delicada", value: "suave" },
                { label: "Forte e marcante", value: "forte" },
                { label: "Elegante e discreta", value: "elegante" },
                { label: "Misteriosa e intensa", value: "misteriosa" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-pink-500/20 hover:border-pink-500/50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-pink-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-pink-300">
                8️⃣ Você se sente mais atraída(o) por alguém com:
              </h2>
            </div>
            <RadioGroup
              value={userData.bodyType}
              onValueChange={(value) => updateData("bodyType", value)}
              className="space-y-4"
            >
              {[
                { label: "Corpo mais atlético", value: "atletico" },
                { label: "Corpo forte/robusto", value: "forte" },
                { label: "Corpo esguio", value: "esguio" },
                { label: "Corpo comum/natural", value: "natural" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-pink-500/20 hover:border-pink-500/50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-pink-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-pink-300">
                9️⃣ Sobre o rosto da sua alma gêmea, o que mais te encanta?
              </h2>
            </div>
            <RadioGroup
              value={userData.face}
              onValueChange={(value) => updateData("face", value)}
              className="space-y-4"
            >
              {[
                { label: "Olhar profundo", value: "profundo" },
                { label: "Sorriso marcante", value: "sorriso" },
                { label: "Expressão séria e forte", value: "seria" },
                { label: "Rosto delicado e calmo", value: "delicado" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-pink-500/20 hover:border-pink-500/50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-pink-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-pink-300">
                🔟 Qual estilo combina mais com a pessoa dos seus sonhos?
              </h2>
            </div>
            <RadioGroup
              value={userData.style}
              onValueChange={(value) => updateData("style", value)}
              className="space-y-4"
            >
              {[
                { label: "Casual (simples e natural)", value: "casual" },
                { label: "Elegante (bem vestido(a))", value: "elegante" },
                { label: "Estilo moderno", value: "moderno" },
                { label: "Estilo clássico", value: "classico" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-pink-500/20 hover:border-pink-500/50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-pink-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-pink-300">
                1️⃣1️⃣ Onde você imagina o primeiro encontro com sua alma gêmea?
              </h2>
              <p className="text-gray-400 italic">
                Ajuda a definir cenário, luz e atmosfera
              </p>
            </div>
            <RadioGroup
              value={userData.meeting}
              onValueChange={(value) => updateData("meeting", value)}
              className="space-y-4"
            >
              {[
                { label: "Em casa, num momento íntimo", value: "casa" },
                { label: "Em uma viagem", value: "viagem" },
                { label: "Em um encontro inesperado", value: "inesperado" },
                { label: "Em um lugar tranquilo e especial", value: "tranquilo" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-pink-500/20 hover:border-pink-500/50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-pink-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-pink-300">
                1️⃣2️⃣ Quando você imagina essa pessoa, qual sensação ela te
                traz?
              </h2>
              <p className="text-gray-400 italic">
                Essa pergunta define o toque final da imagem
              </p>
            </div>
            <RadioGroup
              value={userData.feeling}
              onValueChange={(value) => updateData("feeling", value)}
              className="space-y-4"
            >
              {[
                { label: "Calma e segurança", value: "calma" },
                { label: "Emoção intensa", value: "emocao" },
                { label: "Amor acolhedor", value: "amor" },
                { label: "Desejo e conexão profunda", value: "desejo" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer border border-pink-500/20 hover:border-pink-500/50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-pink-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-lg text-gray-200 cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 13:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Header com ícone místico */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-30" />
                  <img 
                    src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/095cc7d7-0764-4606-a78e-fa146c3aa5ef.jpg" 
                    alt="O Amor Revelado" 
                    className="w-80 h-auto relative rounded-lg shadow-2xl"
                  />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Alma Gêmea Revelada
              </h2>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                O universo já encontrou a pessoa perfeita para você. Agora escolha o cenário dos seus sonhos onde ela vai aparecer pela primeira vez...
              </p>
            </div>

            {/* Opções de cenário */}
            <RadioGroup
              value={userData.scenario}
              onValueChange={(value) => updateData("scenario", value)}
              className="space-y-4"
            >
              {[
                { value: "praia", label: "✦ Praia ao pôr do sol", emoji: "🌅" },
                { value: "montanhas", label: "✦ Montanhas Nevadas", emoji: "🏔️" },
                { value: "casamento", label: "✦ Casamento dos Sonhos", emoji: "💒" },
                { value: "quarto", label: "✦ Quarto Romântico", emoji: "🛏️" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm p-5 rounded-xl hover:from-blue-800/40 hover:to-cyan-800/40 transition-all cursor-pointer border border-cyan-500/30 hover:border-cyan-500/60"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-cyan-500"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-xl text-gray-200 cursor-pointer flex-1 flex items-center gap-3"
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Texto motivacional */}
            <div className="text-center">
              <p className="text-gray-400 italic text-sm">
                Cada escolha molda a energia da revelação...
              </p>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Header com título */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {imageUnlocked ? "Sua Alma Gêmea Revelada" : "Imagem Gerada com Sucesso!"}
              </h2>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {imageUnlocked 
                  ? `${userData.name}, esta é a manifestação visual da energia que o destino reservou para você...`
                  : "A imagem da sua alma gêmea foi criada. Clique no botão abaixo para revelar a foto completa!"
                }
              </p>
            </div>

            {/* Imagem da alma gêmea com blur */}
            {generatedImage && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50" />
                  <div className="relative">
                    <img
                      src={generatedImage}
                      alt="Sua alma gêmea"
                      className={`w-full h-auto rounded-2xl shadow-2xl transition-all duration-700 ${
                        imageUnlocked ? "blur-0" : "blur-3xl"
                      }`}
                    />
                  </div>
                </div>

                {/* Botão de desbloquear */}
                {!imageUnlocked && (
                  <Button
                    onClick={() => setImageUnlocked(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Heart className="mr-3 w-6 h-6" />
                    Desbloquear Foto Completa
                  </Button>
                )}
              </div>
            )}

            {/* Mensagem mística (aparece após desbloquear) */}
            {imageUnlocked && (
              <>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 md:p-8 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <p className="text-gray-300 leading-relaxed">
                        Esta é a manifestação visual da energia que o destino reservou para você. Uma conexão que transcende o tempo e o espaço.
                      </p>
                      <p className="text-gray-400 text-sm italic">
                        Cada detalhe desta imagem foi moldado pelas suas respostas, refletindo os desejos mais profundos da sua alma.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImage;
                      link.download = 'minha-alma-gemea.png';
                      link.click();
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    <Download className="mr-2" />
                    Salvar Imagem
                  </Button>
                  
                  <Button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Minha Alma Gêmea',
                          text: 'Descobri minha alma gêmea através de uma jornada mística!',
                          url: window.location.href,
                        });
                      }
                    }}
                    variant="outline"
                    className="flex-1 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 py-6 text-lg rounded-xl"
                  >
                    <Share2 className="mr-2" />
                    Compartilhar
                  </Button>
                </div>

                {/* Botão para nova jornada */}
                <div className="text-center pt-4">
                  <Button
                    onClick={() => {
                      setStep(0);
                      setUserData({
                        name: "",
                        gender: "",
                        birthDate: "",
                        belief: "",
                        attraction: "",
                        qualities: [],
                        appearance: "",
                        bodyType: "",
                        face: "",
                        style: "",
                        meeting: "",
                        feeling: "",
                        scenario: "",
                      });
                      setGeneratedImage("");
                      setImageUnlocked(false);
                    }}
                    variant="ghost"
                    className="text-gray-400 hover:text-cyan-300 hover:bg-transparent"
                  >
                    ✨ Fazer Nova Jornada
                  </Button>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="bg-gray-900/80 backdrop-blur-xl border-purple-500/30 shadow-2xl p-8 md:p-12">
          {step > 0 && step < 14 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">
                  {step <= 12 ? `Pergunta ${step} de 12` : "Escolha o cenário"}
                </span>
                <span className="text-sm text-purple-400 font-semibold">
                  {step <= 12 ? `${Math.round((step / 12) * 100)}%` : "100%"}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: step <= 12 ? `${(step / 12) * 100}%` : "100%" }}
                />
              </div>
            </div>
          )}

          {renderStep()}

          {step > 0 && step < 14 && (
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                >
                  Voltar
                </Button>
              )}
              <Button
                onClick={() => {
                  if (step === 13) {
                    generateImage();
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={!canProceed() || isGenerating}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 animate-spin" />
                    Revelando...
                  </>
                ) : step === 13 ? (
                  <>
                    <Heart className="mr-2" />
                    Revelar Minha Alma Gêmea
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
