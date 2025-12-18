# Hero Text Positioning Variants

## Вариант A: Текст сверху слева (максимум фото)
```tsx
<section className="relative overflow-hidden min-h-screen">
  <HeroBackgroundSlider images={heroImages} interval={10000} />

  <Container className="pt-20 md:pt-32">
    <motion.div className="max-w-2xl"> {/* Убрали text-center и mx-auto */}
      <h1 className="text-left">FIRST Uzbekistan</h1>
      <p className="text-left">Описание...</p>
      <div className="flex gap-4"> {/* Убрали justify-center */}
        {/* Кнопки */}
      </div>
    </motion.div>
  </Container>
</section>
```

## Вариант B: Текст внизу (как в кино)
```tsx
<section className="relative overflow-hidden min-h-screen flex items-end pb-20">
  <HeroBackgroundSlider images={heroImages} interval={10000} />

  <Container>
    <motion.div className="mx-auto max-w-5xl text-center">
      {/* Ваш текст */}
    </motion.div>
  </Container>
</section>
```

## Вариант C: Вертикальное разделение 50/50
```tsx
<section className="relative overflow-hidden min-h-screen">
  <HeroBackgroundSlider images={heroImages} interval={10000} />

  <Container className="h-screen flex items-center">
    <div className="grid md:grid-cols-2 gap-8 w-full">
      <div className="flex items-center">
        <div>
          <h1>FIRST Uzbekistan</h1>
          <p>Описание...</p>
          <div>{/* Кнопки */}</div>
        </div>
      </div>
      <div>{/* Пустое место для фото */}</div>
    </div>
  </Container>
</section>
```

## Текущий вариант (центр)
- Текст посередине
- Фото видно сверху и снизу
- Классический hero layout
