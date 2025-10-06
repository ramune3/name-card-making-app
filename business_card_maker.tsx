import React, { useState, useRef } from 'react';
import { Upload, Download, User, Mail, Phone, Globe, Linkedin } from 'lucide-react';

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
  const [imageAttribution] = useState('Photo by Unsplash');
  const [cardStyle, setCardStyle] = useState('modern');
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const cardRef = useRef(null);

  const handleInputChange = (field, value) => {
    setCardData({ ...cardData, [field]: value });
  };

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
    const card = cardRef.current;
    if (!card) return;

    try {
      // html2canvasライブラリを動的にロード
      const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
      
      const canvas = await html2canvas.default(card, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      const link = document.createElement('a');
      link.download = `business-card-${cardData.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('ダウンロードエラー:', error);
      alert('ダウンロードに失敗しました。ブラウザの設定を確認してください。');
    }
  };

  const presetImages = [
    { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80', name: '抽象グラデーション' },
    { url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', name: 'グラデーション' },
    { url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80', name: '幾何学模様' },
    { url: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&q=80', name: 'モダン' }
  ];

  const styles = {
    modern: {
      textAlign: 'left',
      bgOpacity: 'bg-opacity-80',
      textColor: 'text-white',
      accentColor: 'border-blue-400'
    },
    elegant: {
      textAlign: 'center',
      bgOpacity: 'bg-opacity-90',
      textColor: 'text-gray-800',
      accentColor: 'border-gold-400'
    },
    minimal: {
      textAlign: 'left',
      bgOpacity: 'bg-opacity-95',
      textColor: 'text-gray-900',
      accentColor: 'border-gray-300'
    }
  };

  const currentStyle = styles[cardStyle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">名刺作成アプリ</h1>
          <p className="text-gray-600">プロフェッショナルな名刺を簡単に作成</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 左側：編集エリア */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                基本情報
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">氏名</label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                  <input
                    type="text"
                    value={cardData.nameEn}
                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">役職</label>
                  <input
                    type="text"
                    value={cardData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">会社名</label>
                  <input
                    type="text"
                    value={cardData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                連絡先情報
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                  <input
                    type="email"
                    value={cardData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                  <input
                    type="tel"
                    value={cardData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
                  <input
                    type="text"
                    value={cardData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={cardData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">デザイン設定</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">スタイル</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCardStyle('modern')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      cardStyle === 'modern' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    モダン
                  </button>
                  <button
                    onClick={() => setCardStyle('elegant')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      cardStyle === 'elegant' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    エレガント
                  </button>
                  <button
                    onClick={() => setCardStyle('minimal')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      cardStyle === 'minimal' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    ミニマル
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">背景画像を選択</label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {presetImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setBackgroundImage(img.url);
                        setUploadedImage(null);
                      }}
                      className="relative h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all"
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2">
                        {img.name}
                      </div>
                    </button>
                  ))}
                </div>
                <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">画像をアップロード</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {uploadedImage && (
                  <p className="text-xs text-gray-600 mt-2">アップロード済み: {uploadedImage}</p>
                )}
              </div>

              <div className="text-xs text-gray-500 mt-4">
                画像出典: {uploadedImage ? 'ユーザーアップロード' : 'Unsplash (https://unsplash.com)'}
              </div>
            </div>
          </div>

          {/* 右側：プレビューエリア */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">プレビュー</h2>
                <button
                  onClick={downloadCard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  ダウンロード
                </button>
              </div>

              {/* 名刺プレビュー */}
              <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl">
                <div
                  ref={cardRef}
                  className="relative w-full max-w-md aspect-[1.75/1] rounded-2xl shadow-2xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-black to-transparent ${currentStyle.bgOpacity}`}></div>
                  
                  <div className={`relative h-full p-8 flex flex-col justify-between text-${currentStyle.textAlign}`}>
                    <div>
                      <h3 className={`text-3xl font-bold mb-1 ${currentStyle.textColor}`}>
                        {cardData.name}
                      </h3>
                      <p className={`text-sm opacity-90 ${currentStyle.textColor} mb-1`}>
                        {cardData.nameEn}
                      </p>
                      <p className={`text-base font-medium ${currentStyle.textColor} opacity-80`}>
                        {cardData.title}
                      </p>
                      <div className={`h-1 w-16 bg-white mt-3 ${currentStyle.textAlign === 'center' ? 'mx-auto' : ''}`}></div>
                    </div>

                    <div>
                      <p className={`text-lg font-semibold mb-3 ${currentStyle.textColor}`}>
                        {cardData.company}
                      </p>
                      <div className={`space-y-1 text-sm ${currentStyle.textColor} opacity-90`}>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span>{cardData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{cardData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          <span>{cardData.website}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Linkedin className="w-3 h-3" />
                          <span>{cardData.linkedin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>ヒント:</strong> 左側のフォームで情報を編集すると、リアルタイムでプレビューが更新されます。
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">使い方</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. 基本情報と連絡先を入力</li>
                <li>2. スタイルを選択（モダン・エレガント・ミニマル）</li>
                <li>3. 背景画像を選択またはアップロード</li>
                <li>4. プレビューを確認してダウンロード</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>デフォルト画像提供: Unsplash (https://unsplash.com)</p>
          <p className="mt-1">無料で商用利用可能な高品質画像サービス</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardMaker;