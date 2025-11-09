import React, { useState, useEffect } from 'react';
import { BookOpen, Video, Users, ShoppingCart, User, LogOut, Download, Calendar, Check, Menu, X, Play, Lock, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, Sparkles, TrendingUp } from 'lucide-react';

const MasterVisaClass = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [countdown, setCountdown] = useState({ days: 2, hours: 23, minutes: 45, seconds: 30 });

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock users database
  const [users, setUsers] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', password: '123456', purchases: [] }
  ]);

  // Products
  const products = {
    course: {
      id: 'course',
      name: 'Master Visa Class',
      nameEn: 'Master Visa Class Course',
      description: 'كورس شامل ومتكامل يساعدك في إتقان جميع إجراءات الحصول على التأشيرات بخطوات احترافية',
      price: 3000,
      oldPrice: 5000,
      priceUSD: 99,
      discount: 40,
      currency: 'جنيه',
      features: [
        '20+ فيديو تعليمي عالي الجودة',
        'شرح مفصل لجميع أنواع التأشيرات',
        'نماذج وأمثلة عملية',
        'دعم فني مستمر',
        'شهادة إتمام الكورس',
        'وصول مدى الحياة'
      ]
    },
    ebook: {
      id: 'ebook',
      name: 'دليل التأشيرات الشامل',
      nameEn: 'Complete Visa Guide',
      description: 'كتاب إلكتروني متكامل يحتوي على كل ما تحتاجه من معلومات عن التأشيرات والإجراءات',
      price: 1500,
      oldPrice: 2500,
      priceUSD: 50,
      discount: 40,
      currency: 'جنيه',
      features: [
        '200+ صفحة من المعلومات القيمة',
        'جداول ومخططات توضيحية',
        'قوائم مرجعية للمستندات',
        'أمثلة حقيقية ودراسات حالة',
        'تحديثات مجانية',
        'صيغة PDF قابلة للطباعة'
      ]
    },
    consultation: {
      id: 'consultation',
      name: 'جلسة استشارة شخصية',
      nameEn: 'Personal Consultation',
      description: 'جلسة استشارية فردية مع خبير التأشيرات للإجابة على جميع استفساراتك',
      price: 1500,
      priceUSD: 30,
      duration: '30 دقيقة',
      currency: 'جنيه',
      features: [
        'جلسة 30 دقيقة عبر Zoom',
        'استشارة شخصية مخصصة',
        'مراجعة مستنداتك',
        'خطة عمل واضحة',
        'متابعة بعد الجلسة',
        'تسجيل الجلسة'
      ]
    }
  };

  // Course lessons
  const lessons = [
    { id: 1, title: 'مقدمة عن التأشيرات', duration: '15:30', description: 'نظرة شاملة عن أنواع التأشيرات' },
    { id: 2, title: 'التأشيرة السياحية', duration: '22:45', description: 'كل ما تحتاج معرفته عن التأشيرة السياحية' },
    { id: 3, title: 'تأشيرة العمل', duration: '28:15', description: 'إجراءات الحصول على تأشيرة العمل' },
    { id: 4, title: 'تأشيرة الدراسة', duration: '25:00', description: 'خطوات التقديم على تأشيرة الدراسة' },
    { id: 5, title: 'المستندات المطلوبة', duration: '18:30', description: 'قائمة شاملة بالمستندات الأساسية' },
    { id: 6, title: 'المقابلة الشخصية', duration: '20:00', description: 'نصائح للنجاح في المقابلة' },
    { id: 7, title: 'حالات الرفض والحلول', duration: '16:45', description: 'كيف تتعامل مع الرفض' },
    { id: 8, title: 'التجديد والتمديد', duration: '14:20', description: 'إجراءات تجديد التأشيرة' }
  ];

  const addToCart = (productId) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(id => id !== productId));
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleSignup = (name, email, password) => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      purchases: []
    };
    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const completePurchase = () => {
    if (currentUser && cart.length > 0) {
      const updatedUser = {
        ...currentUser,
        purchases: [...currentUser.purchases, ...cart]
      };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setCart([]);
      setCurrentPage('dashboard');
    }
  };

  const hasPurchased = (productId) => {
    return currentUser?.purchases.includes(productId);
  };

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg sticky top-0 z-50" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Video className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">Master Visa Class</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-yellow-400 transition">الرئيسية</button>
            <button onClick={() => setCurrentPage('course')} className="hover:text-yellow-400 transition">الكورس</button>
            <button onClick={() => setCurrentPage('ebook')} className="hover:text-yellow-400 transition">الكتاب</button>
            <button onClick={() => setCurrentPage('consultation')} className="hover:text-yellow-400 transition">الاستشارات</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-yellow-400 transition">تواصل معنا</button>
          </div>

          {/* Action Buttons - Left Side */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition">
                  <User className="w-4 h-4" />
                  لوحة التحكم
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 hover:text-yellow-400 transition">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button onClick={() => setCurrentPage('login')} className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition">
                تسجيل الدخول
              </button>
            )}
            
            <button onClick={() => setCurrentPage('checkout')} className="relative hover:scale-110 transition">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden">
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setShowMobileMenu(false); }} className="block w-full text-right py-2 hover:text-yellow-400">الرئيسية</button>
            <button onClick={() => { setCurrentPage('course'); setShowMobileMenu(false); }} className="block w-full text-right py-2 hover:text-yellow-400">الكورس</button>
            <button onClick={() => { setCurrentPage('ebook'); setShowMobileMenu(false); }} className="block w-full text-right py-2 hover:text-yellow-400">الكتاب</button>
            <button onClick={() => { setCurrentPage('consultation'); setShowMobileMenu(false); }} className="block w-full text-right py-2 hover:text-yellow-400">الاستشارات</button>
            <button onClick={() => { setCurrentPage('contact'); setShowMobileMenu(false); }} className="block w-full text-right py-2 hover:text-yellow-400">تواصل معنا</button>
            {isLoggedIn ? (
              <>
                <button onClick={() => { setCurrentPage('dashboard'); setShowMobileMenu(false); }} className="block w-full text-right py-2 bg-yellow-500 text-blue-900 rounded">لوحة التحكم</button>
                <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="block w-full text-right py-2 hover:text-yellow-400">تسجيل الخروج</button>
              </>
            ) : (
              <button onClick={() => { setCurrentPage('login'); setShowMobileMenu(false); }} className="block w-full text-right py-2 bg-yellow-500 text-blue-900 rounded">تسجيل الدخول</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div style={{ direction: 'rtl' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full mb-4 text-sm font-bold animate-pulse">
            ⚡ عرض محدود - خصم 40% لفترة قصيرة!
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Master Visa Class</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">منصتك الشاملة للتميز في عالم التأشيرات</p>
          <p className="text-lg mb-10 max-w-3xl mx-auto text-blue-200">
            احصل على أفضل تدريب احترافي، كتب إلكترونية متخصصة، واستشارات شخصية لتحقيق أهدافك في السفر والعمل والدراسة بالخارج
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentPage('course')} className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg">
              ابدأ رحلتك الآن
            </button>
            <button onClick={() => setCurrentPage('contact')} className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-white/20 transition">
              تحدث مع خبير
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section - NEW */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl mb-2">✅</div>
              <div className="font-bold text-lg">محتوى حصري</div>
              <div className="text-sm text-gray-600">من خبراء التأشيرات</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🎓</div>
              <div className="font-bold text-lg">شهادة معتمدة</div>
              <div className="text-sm text-gray-600">بعد إتمام الكورس</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">💬</div>
              <div className="font-bold text-lg">دعم مستمر</div>
              <div className="text-sm text-gray-600">متابعة على مدار الساعة</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🔒</div>
              <div className="font-bold text-lg">دفع آمن</div>
              <div className="text-sm text-gray-600">حماية كاملة للبيانات</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">منتجاتنا التعليمية</h2>
            <div className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-bold">
              ⏰ العرض ينتهي خلال: {countdown.days} يوم {countdown.hours}:{countdown.minutes.toString().padStart(2, '0')}:{countdown.seconds.toString().padStart(2, '0')}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Course Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-lg font-bold text-sm">
                وفر {products.course.discount}%
              </div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-3">{products.course.name}</h3>
              <p className="text-gray-600 text-center mb-4">{products.course.description}</p>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-gray-400 line-through text-lg">{products.course.oldPrice}</span>
                  <span className="text-3xl font-bold text-blue-600">{products.course.price}</span>
                  <span className="text-xl text-gray-500">{products.course.currency}</span>
                </div>
                <div className="text-sm text-gray-500">≈ ${products.course.priceUSD}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {products.course.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { addToCart('course'); setCurrentPage('course'); }} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                احصل عليه الآن!
              </button>
            </div>

            {/* Ebook Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-lg font-bold text-sm">
                وفر {products.ebook.discount}%
              </div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-3">{products.ebook.name}</h3>
              <p className="text-gray-600 text-center mb-4">{products.ebook.description}</p>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-gray-400 line-through text-lg">{products.ebook.oldPrice}</span>
                  <span className="text-3xl font-bold text-green-600">{products.ebook.price}</span>
                  <span className="text-xl text-gray-500">{products.ebook.currency}</span>
                </div>
                <div className="text-sm text-gray-500">≈ ${products.ebook.priceUSD}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {products.ebook.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { addToCart('ebook'); setCurrentPage('ebook'); }} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                اشتري الآن بخصم!
              </button>
            </div>

            {/* Consultation Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-lg font-bold text-sm">
                عرض خاص
              </div>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-3">{products.consultation.name}</h3>
              <p className="text-gray-600 text-center mb-4">{products.consultation.description}</p>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-purple-600">{products.consultation.price}</span>
                  <span className="text-xl text-gray-500">{products.consultation.currency}</span>
                </div>
                <div className="text-sm text-gray-500">≈ ${products.consultation.priceUSD} / {products.consultation.duration}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {products.consultation.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { addToCart('consultation'); setCurrentPage('consultation'); }} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                احجز مكانك الآن!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">ماذا يقول طلابنا</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  أ
                </div>
                <div>
                  <div className="font-bold">أحمد محمد</div>
                  <div className="text-sm text-gray-600">مهندس</div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700">"كورس رائع وشامل! ساعدني كثيراً في فهم إجراءات التأشيرة وحصلت على الموافقة من أول مرة."</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  س
                </div>
                <div>
                  <div className="font-bold">سارة عبدالله</div>
                  <div className="text-sm text-gray-600">طالبة</div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700">"الكتاب الإلكتروني كنز حقيقي! كل المعلومات اللي كنت محتاجها في مكان واحد."</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  م
                </div>
                <div>
                  <div className="font-bold">محمود حسن</div>
                  <div className="text-sm text-gray-600">رجل أعمال</div>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700">"جلسة الاستشارة كانت ممتازة! الخبير أجاب على كل أسئلتي وأعطاني خطة واضحة."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - NEW */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-blue-900">جاهز لتحقيق حلمك؟</h2>
          <p className="text-xl mb-8 text-blue-800">انضم لآلاف الطلاب الناجحين واحصل على التأشيرة بسهولة</p>
          <button onClick={() => setCurrentPage('course')} className="bg-blue-900 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-blue-800 transition transform hover:scale-105 shadow-xl">
            ابدأ الآن - وفر 40%!
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">2000+</div>
              <div className="text-xl">طالب مسجل</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl">معدل النجاح</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">دولة مشمولة</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Course Page
  const CoursePage = () => (
    <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-500 text-white text-center py-3 rounded-t-xl font-bold animate-pulse">
          ⚡ خصم 40% - العرض ينتهي خلال {countdown.days} يوم و {countdown.hours} ساعة!
        </div>
        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{products.course.name}</h1>
            <p className="text-xl">{products.course.description}</p>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">ماذا ستتعلم؟</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {products.course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">محتوى الكورس</h2>
              <div className="space-y-3">
                {lessons.map((lesson, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">{lesson.id}</span>
                      </div>
                      <div>
                        <div className="font-bold">{lesson.title}</div>
                        <div className="text-sm text-gray-600">{lesson.description}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      {lesson.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">السعر الأصلي</div>
                    <div className="text-2xl text-gray-400 line-through">{products.course.oldPrice} {products.course.currency}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-green-600 font-bold mb-1">وفر {products.course.discount}%</div>
                    <div className="text-5xl font-bold text-blue-600">{products.course.price} {products.course.currency}</div>
                    <div className="text-sm text-gray-600 mt-1">≈ ${products.course.priceUSD}</div>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart('course');
                      setCurrentPage('checkout');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl text-xl font-bold hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    احصل عليه الآن!
                  </button>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                <Lock className="w-4 h-4 inline mx-1" />
                دفع آمن 100% • وصول فوري • ضمان استرجاع المال
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Ebook Page
  const EbookPage = () => (
    <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{products.ebook.name}</h1>
            <p className="text-xl">{products.ebook.description}</p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 h-96 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-32 h-32 text-green-600" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-900">محتويات الكتاب</h2>
                <ul className="space-y-3">
                  {products.ebook.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3 text-green-900">مواصفات الكتاب</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><span className="font-bold">عدد الصفحات:</span> 200+ صفحة</div>
                <div><span className="font-bold">الصيغة:</span> PDF</div>
                <div><span className="font-bold">اللغة:</span> العربية</div>
                <div><span className="font-bold">التحديثات:</span> مجانية مدى الحياة</div>
              </div>
            </div>

            <div className="border-t pt-6 flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-green-600">{products.ebook.price} {products.ebook.currency}</div>
                <div className="text-gray-600">تحميل فوري بعد الشراء</div>
              </div>
              <button 
                onClick={() => {
                  addToCart('ebook');
                  setCurrentPage('checkout');
                }}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-700 transition"
              >
                اشترِ الكتاب الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Consultation Page
  const ConsultationPage = () => (
    <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{products.consultation.name}</h1>
            <p className="text-xl">{products.consultation.description}</p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-900">ما ستحصل عليه</h2>
                <ul className="space-y-3">
                  {products.consultation.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-900">كيف تعمل الجلسة؟</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <div className="font-bold">احجز موعدك</div>
                      <div className="text-sm text-gray-600">اختر الوقت المناسب لك</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <div className="font-bold">أرسل مستنداتك</div>
                      <div className="text-sm text-gray-600">للمراجعة قبل الجلسة</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold">3</div>
                    <div>
                      <div className="font-bold">انضم للجلسة</div>
                      <div className="text-sm text-gray-600">عبر Zoom في الموعد المحدد</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <div className="font-bold">احصل على خطة العمل</div>
                      <div className="text-sm text-gray-600">وتسجيل الجلسة للمراجعة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-purple-600">{products.consultation.price} {products.consultation.currency}</div>
                <div className="text-gray-600">جلسة واحدة - 60 دقيقة</div>
              </div>
              <button 
                onClick={() => {
                  addToCart('consultation');
                  setCurrentPage('checkout');
                }}
                className="bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-purple-700 transition"
              >
                احجز جلستك الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Login/Signup Page
  const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      if (isLogin) {
        const success = handleLogin(formData.email, formData.password);
        if (success) {
          setCurrentPage(cart.length > 0 ? 'checkout' : 'dashboard');
        } else {
          setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('كلمات المرور غير متطابقة');
          return;
        }
        if (formData.password.length < 6) {
          setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
          return;
        }
        handleSignup(formData.name, formData.email, formData.password);
        setCurrentPage(cart.length > 0 ? 'checkout' : 'dashboard');
      }
    };

    return (
      <div style={{ direction: 'rtl' }} className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900">
                {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">كلمة المرور</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold mb-2">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); setFormData({ name: '', email: '', password: '', confirmPassword: '' }); }}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                {isLogin ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب؟ سجل الدخول'}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
                <p className="font-bold mb-2">للتجربة استخدم:</p>
                <p>البريد: ahmed@example.com</p>
                <p>كلمة المرور: 123456</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Checkout Page
  const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);

    const totalAmount = cart.reduce((sum, productId) => sum + products[productId].price, 0);

    const handleCheckout = () => {
      if (!isLoggedIn) {
        setCurrentPage('login');
        return;
      }

      setProcessing(true);
      setTimeout(() => {
        completePurchase();
        setProcessing(false);
      }, 2000);
    };

    return (
      <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">إتمام الطلب</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">عربة التسوق فارغة</h2>
              <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات بعد</p>
              <button onClick={() => setCurrentPage('home')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Order Summary */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">ملخص الطلب</h2>
                  <div className="space-y-4">
                    {cart.map(productId => (
                      <div key={productId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            productId === 'course' ? 'bg-blue-100' : productId === 'ebook' ? 'bg-green-100' : 'bg-purple-100'
                          }`}>
                            {productId === 'course' && <Video className="w-6 h-6 text-blue-600" />}
                            {productId === 'ebook' && <BookOpen className="w-6 h-6 text-green-600" />}
                            {productId === 'consultation' && <Users className="w-6 h-6 text-purple-600" />}
                          </div>
                          <div>
                            <div className="font-bold">{products[productId].name}</div>
                            <div className="text-sm text-gray-600">{products[productId].nameEn}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">{products[productId].price} {products[productId].currency}</span>
                          <button onClick={() => removeFromCart(productId)} className="text-red-500 hover:text-red-700">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">طريقة الدفع</h2>
                  
                  <div className="space-y-3 mb-6">
                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                      paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-bold">بطاقة ائتمان</div>
                        <div className="text-sm text-gray-600">Visa / Mastercard / Mada</div>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                      paymentMethod === 'vodafone' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="vodafone"
                        checked={paymentMethod === 'vodafone'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-bold">فودافون كاش</div>
                        <div className="text-sm text-gray-600">Vodafone Cash</div>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                      paymentMethod === 'instapay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="instapay"
                        checked={paymentMethod === 'instapay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-bold">إنستاباي</div>
                        <div className="text-sm text-gray-600">InstaPay</div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-bold mb-2">رقم البطاقة</label>
                        <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold mb-2">تاريخ الانتهاء</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">CVV</label>
                          <input type="text" placeholder="123" className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === 'vodafone' || paymentMethod === 'instapay') && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm">سيتم تحويلك لإتمام عملية الدفع عبر {paymentMethod === 'vodafone' ? 'فودافون كاش' : 'إنستاباي'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total & Checkout */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                  <h3 className="text-xl font-bold mb-4">الإجمالي</h3>
                  
                  <div className="space-y-2 mb-4 pb-4 border-b">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{totalAmount} جنيه</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>الخصم</span>
                      <span>0 جنيه</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>الإجمالي</span>
                    <span className="text-blue-600">{totalAmount} جنيه</span>
                  </div>

                  {!isLoggedIn ? (
                    <button
                      onClick={() => setCurrentPage('login')}
                      className="w-full bg-yellow-500 text-blue-900 py-4 rounded-lg font-bold hover:bg-yellow-400 transition mb-3"
                    >
                      سجل الدخول للمتابعة
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 mb-3"
                    >
                      {processing ? 'جاري المعالجة...' : 'إتمام الشراء'}
                    </button>
                  )}

                  <div className="text-xs text-gray-600 text-center">
                    <Lock className="w-4 h-4 inline mx-1" />
                    الدفع آمن ومشفر بالكامل
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Dashboard Page
  const DashboardPage = () => {
    if (!isLoggedIn || !currentUser) {
      setCurrentPage('login');
      return null;
    }

    return (
      <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-8 text-white">
            <h1 className="text-4xl font-bold mb-2">مرحباً، {currentUser.name}</h1>
            <p className="text-xl">لوحة التحكم الخاصة بك</p>
          </div>

          {currentUser.purchases.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">لم تقم بأي عمليات شراء بعد</h2>
              <p className="text-gray-600 mb-6">ابدأ رحلتك التعليمية الآن</p>
              <button onClick={() => setCurrentPage('home')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUser.purchases.includes('course') && (
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-3">{products.course.name}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>التقدم</span>
                      <span>{Math.round((completedLessons.length / lessons.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage('lessons')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    فتح الدروس
                  </button>
                </div>
              )}

              {currentUser.purchases.includes('ebook') && (
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-3">{products.ebook.name}</h3>
                  <p className="text-gray-600 text-center mb-6">جاهز للتحميل</p>
                  <button
                    onClick={() => alert('تم بدء تحميل الكتاب...')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    تحميل الكتاب (PDF)
                  </button>
                </div>
              )}

              {currentUser.purchases.includes('consultation') && (
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-3">{products.consultation.name}</h3>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4 text-center">
                    <div className="text-sm text-gray-600 mb-1">الحالة</div>
                    <div className="font-bold text-purple-600">في انتظار الحجز</div>
                  </div>
                  <button
                    onClick={() => alert('سيتم التواصل معك لتحديد موعد الجلسة')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    حجز الموعد
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Lessons Page
  const LessonsPage = () => {
    if (!hasPurchased('course')) {
      return (
        <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">المحتوى مغلق</h2>
              <p className="text-gray-600 mb-6">يجب شراء الكورس للوصول إلى الدروس</p>
              <button onClick={() => setCurrentPage('course')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                اشترِ الكورس الآن
              </button>
            </div>
          </div>
        </div>
      );
    }

    const lesson = lessons[currentLesson];

    return (
      <div style={{ direction: 'rtl' }} className="bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 relative select-none" onContextMenu={(e) => e.preventDefault()}>
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">فيديو الدرس {lesson.id}</p>
                    <p className="text-sm opacity-75 mt-2">{lesson.duration}</p>
                    <div className="absolute bottom-4 left-4 text-xs opacity-50">
                      {currentUser?.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-gray-400 mb-4">{lesson.description}</p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      markLessonComplete(lesson.id);
                      if (currentLesson < lessons.length - 1) {
                        setCurrentLesson(currentLesson + 1);
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    {currentLesson < lessons.length - 1 ? (
                      <>الدرس التالي <Play className="w-4 h-4" /></>
                    ) : (
                      <>أكملت الكورس <Check className="w-4 h-4" /></>
                    )}
                  </button>
                  
                  {!completedLessons.includes(lesson.id) && (
                    <button
                      onClick={() => markLessonComplete(lesson.id)}
                      className="border border-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition"
                    >
                      وضع علامة كمكتمل
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Lessons Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl p-4 sticky top-4">
                <h3 className="text-xl font-bold mb-4 text-white">قائمة الدروس</h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {lessons.map((l, idx) => (
                    <button
                      key={l.id}
                      onClick={() => setCurrentLesson(idx)}
                      className={`w-full text-right p-3 rounded-lg transition ${
                        currentLesson === idx
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            completedLessons.includes(l.id) ? 'bg-green-500' : 'bg-gray-600'
                          }`}>
                            {completedLessons.includes(l.id) ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <span className="text-sm">{l.id}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{l.title}</div>
                            <div className="text-xs opacity-75">{l.duration}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Contact Page
  const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    };

    return (
      <div style={{ direction: 'rtl' }} className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-blue-900">تواصل معنا</h1>
            <p className="text-xl text-gray-600">نحن هنا للإجابة على جميع استفساراتك</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">تم إرسال رسالتك بنجاح!</p>
                  <p className="text-sm">سنرد عليك في أقرب وقت ممكن</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">الاسم</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">الموضوع</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">الرسالة</label>
                    <textarea
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">support@mastervisaclass.com</p>
                    <p className="text-gray-600">info@mastervisaclass.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">الهاتف / واتساب</h3>
                    <p className="text-gray-600" dir="ltr">+20 123 456 7890</p>
                    <p className="text-sm text-gray-500 mt-1">متاح من 9 صباحاً - 6 مساءً</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">العنوان</h3>
                    <p className="text-gray-600">القاهرة، مصر</p>
                    <p className="text-gray-600">الجيزة، الهرم</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  متابعنا على السوشيال ميديا
                </h3>
                <div className="flex gap-3">
                  <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12 px-4" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold">Master Visa Class</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              منصتك الشاملة للتميز في عالم التأشيرات والسفر
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <div className="space-y-2 text-sm">
              <button onClick={() => setCurrentPage('home')} className="block hover:text-yellow-400 transition">الرئيسية</button>
              <button onClick={() => setCurrentPage('course')} className="block hover:text-yellow-400 transition">الكورس</button>
              <button onClick={() => setCurrentPage('ebook')} className="block hover:text-yellow-400 transition">الكتاب</button>
              <button onClick={() => setCurrentPage('consultation')} className="block hover:text-yellow-400 transition">الاستشارات</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">الحساب</h4>
            <div className="space-y-2 text-sm">
              {isLoggedIn ? (
                <>
                  <button onClick={() => setCurrentPage('dashboard')} className="block hover:text-yellow-400 transition">لوحة التحكم</button>
                  <button onClick={handleLogout} className="block hover:text-yellow-400 transition">تسجيل الخروج</button>
                </>
              ) : (
                <button onClick={() => setCurrentPage('login')} className="block hover:text-yellow-400 transition">تسجيل الدخول</button>
              )}
              <button onClick={() => setCurrentPage('contact')} className="block hover:text-yellow-400 transition">تواصل معنا</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <p>support@mastervisaclass.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <p dir="ltr">+20 123 456 7890</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <p>القاهرة، مصر</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">&copy; 2024 Master Visa Class. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-yellow-400 transition">الشروط والأحكام</a>
              <a href="#" className="hover:text-yellow-400 transition">سياسة الخصوصية</a>
              <a href="#" className="hover:text-yellow-400 transition">سياسة الاسترجاع</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'course' && <CoursePage />}
      {currentPage === 'ebook' && <EbookPage />}
      {currentPage === 'consultation' && <ConsultationPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'lessons' && <LessonsPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
};

export default MasterVisaClass