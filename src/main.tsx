import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowDown, ArrowUp, ArrowUpRight, Clock3, MapPin, Menu, Phone, X,
} from 'lucide-react';
import './styles.css';

const base = import.meta.env.BASE_URL;
const phoneHref = 'tel:+79163003036';
const phoneLabel = '+7 (916) 300-30-36';
const mapsHref = 'https://yandex.ru/maps/org/glavny/1753194133/?ll=37.851401%2C55.912297&z=14';

const gallery = [
  { src: 'glavny-billiards-player.jpg', alt: 'Иллюстративная фотография игрока за бильярдным столом' },
  { src: 'glavny-billiards-hall.jpg', alt: 'Иллюстративная фотография бильярдного зала' },
  { src: 'glavny-billiards-shot.jpg', alt: 'Иллюстративная фотография удара по бильярдному шару' },
  { src: 'glavny-billiards-friends.jpg', alt: 'Иллюстративная фотография дружеской партии' },
  { src: 'glavny-billiards-balls.jpg', alt: 'Иллюстративная фотография шаров для русского бильярда' },
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
        <a className="brand" href="#top" aria-label="Главный — наверх">
          <span className="brand-mark">Г</span>
          <span className="brand-copy"><b>Главный</b><small>Бильярдный клуб · Королёв</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#club">О клубе</a><a href="#prices">Цены</a><a href="#gallery">Атмосфера</a><a href="#contacts">Контакты</a>
        </nav>
        <a className="header-call" href={phoneHref}><Phone size={18} /> <span>{phoneLabel}</span></a>
        <button className="menu-button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <section className="hero" style={{ '--hero-image': `url(${base}images/5ba279979f24eab771fc75c7_gb.jpg)` } as React.CSSProperties}>

        <div id="top" className="hero-content shell">
          <p className="eyebrow"><span /> Бильярдный клуб в Королёве</p>
          <h1>Вечер начинается<br />с хорошей <em>партии</em></h1>
          <p className="hero-lead">Русский бильярд и американский пул в клубе с характером. Для серьёзной партии, встречи с друзьями и хорошего вечера.</p>
          <div className="hero-actions">
            <a className="button button-prices" href="#prices">Цены</a>
            <a className="button button-primary" href={phoneHref}><Phone size={19} /> Забронировать стол</a>
          </div>
          <div className="hero-meta">
            <a href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> ул. Ильича, 11</a>
            <span><Clock3 /> Пн–чт, вс: 14:00–02:00 · Пт–сб: 14:00–04:00</span>
          </div>
          <p className="hero-photo-note">Временное фото — заменим на снимок клуба</p>
        </div>
        <a className="scroll-hint" href="#club" aria-label="Листать к информации о клубе"><ArrowDown /></a>
      </section>

      <section id="club" className="facts-zone" aria-label="Коротко о клубе">
        <div className="quick-facts shell">
          <div><small>В клубе</small><strong>7 столов</strong><span>6 русских и 1 для пула</span></div>
          <div><small>Выбор игры</small><strong>2 формата</strong><span>русский бильярд и пул</span></div>
          <div><small>Для игры</small><strong>Прокат кия</strong><span>кий можно взять в клубе</span></div>
          <div><small>Ещё в клубе</small><strong>Дартс</strong><span>игра для компании</span></div>
        </div>
      </section>

      <section className="about section-pad shell">
        <div className="about-copy">
          <p className="section-kicker">Место для своей игры</p>
          <h2>Здесь остаются<br />только <em>игроки</em><br /><em>и момент</em></h2>
          <p className="section-lead">Спокойный вечер с друзьями, серьёзная партия или первый знакомый удар — в «Главном» есть место для любого темпа.</p>
          <div className="feature-list">
            <div><b>7 игровых столов</b><small>6 для русского бильярда и 1 для американского пула</small></div>
            <div><b>Турниры</b><small>В клубе проводятся бильярдные соревнования</small></div>
            <div><b>Дартс и прокат кия</b><small>Ещё один формат игры и возможность взять кий в клубе</small></div>
            <div><b>Бар и Wi-Fi</b><small>Всё необходимое для длинной партии и хорошей компании</small></div>
          </div>
        </div>
        <div className="about-image-wrap">
          <img src={`${base}images/glavny-billiards-balls.jpg`} alt="Иллюстративная фотография шаров для русского бильярда" />
        </div>
      </section>

      <section id="prices" className="prices section-pad">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">Стоимость игры</p><h2>Выберите свой <em>стол</em></h2></div>
            <p>Цены указаны как ориентир по открытой карточке клуба. Перед визитом рекомендуем уточнить актуальную стоимость по телефону.</p>
          </div>

          <div className="price-grid">
            <a className="price-card price-card-featured" href="#booking" aria-label="Перейти к бронированию стола для русского бильярда">
              <div><p className="price-label">Русский бильярд</p><h3><span>600–1000</span><small>₽ / час</small></h3><p className="price-caption">Ориентировочная стоимость</p></div>
              <ul><li>6 столов для русского бильярда</li><li>Стоимость зависит от времени и выбранного стола</li><li>Точную цену уточните перед визитом</li></ul>
            </a>

            <a className="price-card" href="#booking" aria-label="Перейти к бронированию стола для американского пула">
              <div><p className="price-label">Американский пул</p><h3><span>500</span><small>₽ / час</small></h3><p className="price-caption">Ориентировочная стоимость</p></div>
              <ul><li>1 стол для американского пула</li><li>Подходит для дружеской партии</li><li>Точную цену уточните перед визитом</li></ul>
            </a>

            <a className="price-note-card" href="#booking" aria-label="Перейти к бронированию и уточнить стоимость">
              <p>Перед визитом</p><strong>Уточните цену</strong>
              <span>Актуальную стоимость и свободные столы подскажут по телефону</span>
              <small>Нажмите, чтобы перейти к бронированию</small>
            </a>
          </div>
          <div className="extra-prices" aria-label="Дополнительные услуги">
            <p className="extra-prices-heading">Дополнительно</p>
            <div><span>Прокат кия</span><strong>200 ₽</strong></div>
            <div><span>Дартс</span><strong>300 ₽</strong></div>
            <small>Цены из меню клуба, которое давно не обновлялось. Уточните их при бронировании.</small>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section section-pad shell">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">Иллюстративные фотографии</p><h2>Почувствуйте <em>атмосферу</em></h2></div>
          <p>После получения материалов мы заменим эти иллюстрации на настоящие фотографии клуба «Главный».</p>
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
            <a className="button button-primary" href={phoneHref}><Phone /> Позвонить для брони</a>
            <a className="button button-outline-dark" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a>
          </div>
        </div>
      </section>

      <section id="contacts" className="contacts section-pad">
        <div className="shell contacts-grid">
          <div className="contacts-copy">
            <p className="section-kicker">Контакты</p><h2>Увидимся<br /><em>за столом</em></h2>
            <div className="contact-lines">
              <a href={phoneHref}><span>Телефон</span><b>{phoneLabel}</b></a>
              <div><span>Режим работы</span><b>Пн–чт, вс: 14:00–02:00<br />Пт–сб: 14:00–04:00</b></div>
              <div><span>Адрес</span><b>Королёв, улица Ильича, 11</b></div>
            </div>
            <div className="contact-buttons">
              <a className="button button-primary" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a>
              <a className="button button-ghost" href={phoneHref}><Phone /> Позвонить</a>
            </div>
          </div>
          <a className="map-card" href={mapsHref} target="_blank" rel="noreferrer" aria-label="Открыть клуб в Яндекс Картах">
            <div className="map-grid-lines" />
            <span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" />
            <span className="map-pin"><MapPin /></span>
            <span className="map-label"><small>Бильярдный клуб «Главный»</small><b>ул. Ильича, 11</b></span>
            <span className="map-link">Открыть в картах <ArrowUpRight /></span>
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top"><span className="brand-mark">Г</span><span className="brand-copy"><b>Главный</b><small>Бильярдный клуб · Королёв</small></span></a>
        <p>© {new Date().getFullYear()} Бильярдный клуб «Главный»</p>
        <a className="footer-phone" href={phoneHref}>{phoneLabel}</a>
        <a className="back-to-top" href="#top"><ArrowUp /> Наверх</a>
      </footer>

      {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню">
        <button onClick={closeMenu} aria-label="Закрыть меню"><X /></button>
        <nav><a href="#club" onClick={closeMenu}>О клубе</a><a href="#prices" onClick={closeMenu}>Цены</a><a href="#gallery" onClick={closeMenu}>Атмосфера</a><a href="#contacts" onClick={closeMenu}>Контакты</a></nav>
        <a className="button button-primary" href={phoneHref}><Phone /> Забронировать стол</a>
      </div>}

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onClick={() => setLightbox(null)}>
        <button aria-label="Закрыть фотографию"><X /></button>
        <img src={`${base}images/${gallery[lightbox].src}`} alt={gallery[lightbox].alt} onClick={(event) => event.stopPropagation()} />
      </div>}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
