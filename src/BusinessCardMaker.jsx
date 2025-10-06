import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Upload, Download, User, Mail, Phone, Globe, Linkedin } from 'lucide-react';
import html2canvas from 'html2canvas'; // ← CDNではなくパッケージから読み込み

const BusinessCardMaker = () => {
  const [cardData, setCardData] = useState({
    name: '山田 太郎',
    nameEn: 'Taro Yamada',
    title: 'シニアエンジニア',
    company: '株式会社テクノロジー',
    email: 'taro.yamada@example.com',
    phone: '03-1234-5678',
    website: 'www.example.com',
    linkedin: 'linkedin.com/in/taroyamada'
  });

  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80');
  const [cardStyle, setCardStyle] = useState('modern');
  const [uploadedImage, setUploadedImage] = useState(null);
  const cardRef = useRef(null);

  const handleInputChange = (field, value) => setCardData({ ...cardData, [field]: value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target.result);
        setUploadedImage(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      });
      const link = document.createElement('a');
      link.download = `business-card-${cardData.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert('ダウンロードに失敗しました。');
    }
  };

  const styles = {
    modern: { textAlign: 'left', textColor: 'text-white' },
    elegant: { textAlign: 'center', textColor: 'text-gray-800' },
    minimal: { textAlign: 'left', textColor: 'text-gray-900' }
  };
  const currentStyle = styles[cardStyle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">名刺作成アプリ</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 左側：編集 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <div>
              <label>氏名：</label>
              <input value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>英語名：</label>
              <input value={cardData.nameEn} onChange={(e) => handleInputChange('nameEn', e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>役職：</label>
              <input value={cardData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>会社名：</label>
              <input value={cardData.company} onChange={(e) => handleInputChange('company', e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label>背景画像アップロード：</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <button onClick={downloadCard} className="bg-blue-600 text-white px-4 py-2 rounded">
              ダウンロード
            </button>
          </div>

          {/* 右側：プレビュー */}
          <div className="flex justify-center items-center">
            <div
              ref={cardRef}
              className="relative w-full max-w-md aspect-[1.75/1] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className={`relative h-full p-6 text-${currentStyle.textAlign} ${currentStyle.textColor}`}>
                <h2 className="text-3xl font-bold">{cardData.name}</h2>
                <p>{cardData.nameEn}</p>
                <p>{cardData.title}</p>
                <p>{cardData.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<BusinessCardMaker />);
