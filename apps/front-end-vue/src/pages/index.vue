<template>
  <section class="hero h-full bg-base-200">
    <main class="hero-content text-center border-none backdrop-blur-2xl bg-transparent">
      <article class="max-w-md">
        <h1 class="text-5xl font-bold">Order API</h1>
        <p class="py-6">
          Front-end utilizando Vue.js e daisyUI consumindo API RESTful de pedidos desenvolvida para o workshop de API
          rest, demonstrando o consumo de API via através de uma SPA.
        </p>
        <a href="https://github.com/extendsLcc/workshop-REST_API" target="_blank">
          <button class="btn btn-primary" type="button">
            <i class="i-mdi-github mr-2"></i>
            Source
          </button>
        </a>
      </article>
    </main>
  </section>
</template>

<style>
  .glass {
    border: none;
    -webkit-backdrop-filter: blur(var(--glass-blur, 40px));
    backdrop-filter: blur(var(--glass-blur, 40px));
    background-color: transparent;
    background-image: linear-gradient(135deg, rgb(255 255 255 / var(--glass-opacity, 30%)) 0%, rgb(0 0 0/0%) 100%),
      linear-gradient(
        var(--glass-reflex-degree, 100deg),
        rgb(255 255 255 / var(--glass-reflex-opacity, 10%)) 25%,
        rgb(0 0 0/0%) 25%
      );
    box-shadow: 0 0 0 1px rgb(255 255 255 / var(--glass-border-opacity, 10%)) inset, 0 0 0 2px #0000000d;
    text-shadow: 0 1px rgb(0 0 0 / var(--glass-text-shadow-opacity, 5%));
  }
</style>
