import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowDown, ArrowUp, ArrowUpRight, Clock3, ExternalLink, MapPin, Menu,
  MessageCircle, Phone, X,
} from 'lucide-react';
import './styles.css';

const base = import.meta.env.BASE_URL;
const phoneHref = 'tel:+74955028373';
const phoneLabel = '+7 (495) 502-83-73';
const whatsappHref = 'https://wa.me/79265699986?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%BB.';
const mapsHref = 'https://yandex.ru/maps/?pt=37.869233,55.919881&z=17&l=map';

const gallery = [
  { src: '5b9a7b96f61933d39bd79a5c_7.jpg', alt: 'Столы для русской пирамиды в клубе' },
  { src: '5ba2ba1bdef57493e9d25819_obzor.jpg', alt: 'Бильярдный зал Мастер-Круазе' },
  { src: '5ba2bc8f34a9e848030e8023_foto_8.jpg', alt: 'Игрок выполняет удар' },
  { src: '5ba2bc8f609bb85ce1890a12_foto_7.jpg', alt: 'Игра в русскую пирамиду' },
  { src: '5ba2bc8f3c27112211eecd66_foto_5.jpg', alt: 'Игровая зона клуба' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setLightbox(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={`site-header shell${headerScrolled ? ' site-header-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Мастер-Круазе — наверх">
          <span className="brand-mark">МК</span>
          <span className="brand-copy"><b>Мастер-Круазе</b><small>Бильярдный клуб · Королёв</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#club">О клубе</a><a href="#prices">Цены</a><a href="#gallery">Атмосфера</a><a href="#contacts">Контакты</a>
        </nav>
        <a className="header-call" href={phoneHref}><Phone size={18} /> <span>{phoneLabel}</span></a>
        <button className="menu-button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <section className="hero" style={{ '--hero-image': `url(${base}images/5ba279979f24eab771fc75c7_gb.jpg)` } as React.CSSProperties}>

        <div id="top" className="hero-content shell">
          <p className="eyebrow"><span /> Ежедневно с 16:00 до 04:00</p>
          <h1>Вечер начинается<br />с хорошей <em>партии</em></h1>
          <p className="hero-lead">Русская пирамида и американский пул в клубе с характером. Без лишнего шума — только игра, друзья и время для себя.</p>
          <div className="hero-actions">
            <a className="button button-prices" href="#prices">Цены</a>
            <a className="button button-primary" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Забронировать стол</a>
            <a className="button button-ghost" href={phoneHref}><Phone size={19} /> Позвонить</a>
          </div>
          <div className="hero-meta">
            <a href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> пр-т Космонавтов, 7Г</a>
            <span><Clock3 /> Сегодня до 04:00</span>
          </div>
        </div>
        <a className="scroll-hint" href="#club" aria-label="Листать к информации о клубе"><ArrowDown /></a>
      </section>

      <section id="club" className="facts-zone" aria-label="Клуб в цифрах">
        <div className="quick-facts shell">
          <div><strong>7</strong><span>столов русского бильярда</span></div>
          <div><strong>2</strong><span>VIP-стола русской пирамиды</span></div>
          <div><strong>2</strong><span>стола американского пула</span></div>
          <div><strong>04:00</strong><span>играем каждый день</span></div>
        </div>
      </section>

      <section className="about section-pad shell">
        <div className="about-copy">
          <p className="section-kicker">Место для своей игры</p>
          <h2>Здесь остаются<br />только <em>игроки</em><br /><em>и момент</em></h2>
          <p className="section-lead">Спокойный вечер с друзьями, серьёзная партия или первый знакомый удар — в клубе есть место для любого темпа.</p>
          <div className="feature-list">
            <div><b>Профессиональные столы</b><small>Русская пирамида и американский пул</small></div>
            <div><b>Большая TV-зона</b><small>Спортивные трансляции на большом экране</small></div>
            <div><b>Бар и кофе</b><small>Всё для длинной партии и хорошей компании</small></div>
          </div>
        </div>
        <div className="about-image-wrap">
          <img src={`${base}images/5b9a7b96f61933d39bd79a5c_7.jpg`} alt="Шары для русской пирамиды на зелёном сукне" />
        </div>
      </section>

      <section id="prices" className="prices section-pad">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">Стоимость игры</p><h2>Выберите свой <em>стол</em></h2></div>
            <p>По понедельникам действует единая специальная цена — отличный повод начать неделю с партии.</p>
          </div>

          <div className="price-grid">
            <a className="price-card price-card-featured" href="#booking" aria-label="Перейти к бронированию стола для русской пирамиды">
              <div><p className="price-label">Русский бильярд</p><h3>500 <small>₽ / час</small></h3><p className="price-caption">Вторник — воскресенье</p></div>
              <ul><li>7 профессиональных столов</li><li>VIP-стол — 550 ₽ / час</li><li>Понедельник — 300 ₽ / час</li></ul>
            </a>

            <a className="price-card" href="#booking" aria-label="Перейти к бронированию стола для американского пула">
              <div><p className="price-label">Американский пул</p><h3>450 <small>₽ / час</small></h3><p className="price-caption">Вторник — воскресенье</p></div>
              <ul><li>2 стола для пула</li><li>Подходит для компании</li><li>Понедельник — 300 ₽ / час</li></ul>
            </a>

            <a className="monday-card" href="#booking" aria-label="Перейти к бронированию стола по цене понедельника">
              <p>Каждый понедельник</p><strong>300 ₽</strong>
              <span>за час игры<br />на любом обычном столе</span>
              <small>Нажмите, чтобы уточнить свободное время</small>
            </a>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section section-pad shell">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Внутри клуба</p><h2>Почувствуйте <em>атмосферу</em></h2></div>
          <p>Тёплый свет, зелёное сукно и несколько часов, которые принадлежат только вашей игре.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <button key={image.src} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setLightbox(index)} aria-label={`Открыть фото: ${image.alt}`}>
              <img src={`${base}images/${image.src}`} alt={image.alt} loading="lazy" />
              <span><ArrowUpRight /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="booking" className="booking-zone">
        <div className="booking-banner shell">
          <div><p className="section-kicker">Стол свободен</p><h2>Осталось выбрать <em>время</em></h2></div>
          <div className="booking-actions">
            <a className="button button-primary" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> Написать в WhatsApp</a>
            <a className="button button-outline-dark" href={phoneHref}><Phone /> Позвонить</a>
          </div>
        </div>
      </section>

      <section id="contacts" className="contacts section-pad">
        <div className="shell contacts-grid">
          <div className="contacts-copy">
            <p className="section-kicker">Контакты</p><h2>Увидимся<br /><em>за столом</em></h2>
            <div className="contact-lines">
              <a href={phoneHref}><span>Телефон</span><b>{phoneLabel}</b></a>
              <div><span>Режим работы</span><b>Ежедневно, 16:00–04:00</b></div>
              <div><span>Адрес</span><b>Королёв, пр-т Космонавтов, 7Г</b><small>ТЦ «Эльдорадо», 3-й этаж, вход справа с торца</small></div>
            </div>
            <div className="contact-buttons">
              <a className="button button-primary" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a>
              <a className="button button-ghost" href="https://vk.com/billiardmk" target="_blank" rel="noreferrer">Мы ВКонтакте <ExternalLink /></a>
            </div>
          </div>
          <a className="map-card" href={mapsHref} target="_blank" rel="noreferrer" aria-label="Открыть клуб в Яндекс Картах">
            <div className="map-grid-lines" />
            <span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" />
            <span className="map-pin"><MapPin /></span>
            <span className="map-label"><small>Мастер-Круазе</small><b>пр-т Космонавтов, 7Г</b></span>
            <span className="map-link">Открыть в картах <ArrowUpRight /></span>
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top"><span className="brand-mark">МК</span><span className="brand-copy"><b>Мастер-Круазе</b><small>Бильярдный клуб · Королёв</small></span></a>
        <p>© {new Date().getFullYear()} Бильярдный клуб «Мастер-Круазе»</p>
        <a className="footer-phone" href={phoneHref}>{phoneLabel}</a>
        <a className="back-to-top" href="#top"><ArrowUp /> Наверх</a>
      </footer>

      {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню">
        <button onClick={closeMenu} aria-label="Закрыть меню"><X /></button>
        <nav><a href="#club" onClick={closeMenu}>О клубе</a><a href="#prices" onClick={closeMenu}>Цены</a><a href="#gallery" onClick={closeMenu}>Атмосфера</a><a href="#contacts" onClick={closeMenu}>Контакты</a></nav>
        <a className="button button-primary" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> Забронировать стол</a>
      </div>}

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onClick={() => setLightbox(null)}>
        <button aria-label="Закрыть фотографию"><X /></button>
        <img className={lightbox >= 2 ? 'lightbox-cropped' : undefined} src={`${base}images/${gallery[lightbox].src}`} alt={gallery[lightbox].alt} onClick={(event) => event.stopPropagation()} />
      </div>}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
