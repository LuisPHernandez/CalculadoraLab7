# Calculadora Lab 7

Calculadora simple hecha con React, TypeScript y Vite para practicar componentes,
testing, Storybook y linting.

## Link de entrega

- Aplicacion publicada: http://34.51.81.158/calculadora/

## Requisitos implementados

- Display y teclado numerico con botones HTML.
- Entrada exclusivamente desde los botones.
- Concatenacion de digitos en el display.
- Operaciones encadenadas con resultado parcial al presionar otra operacion.
- Boton de igualdad.
- Suma, resta, multiplicacion y division.
- Punto decimal.
- Funcion `+/-`.
- Limite de 9 caracteres en el display.
- `ERROR` para resultados negativos o mayores a `999999999`.
- Logica principal en hook propio: `useCalculator`.
- Componentes separados para pantalla, teclado y botones.
- Historias de Storybook.
- Tests con Vitest y Testing Library.
- ESLint con reglas para prohibir punto y coma y lineas mayores a 120 caracteres.
- Title y favicon personalizados.

## Scripts

Instalar dependencias:

```bash
npm install
```

Correr tests:

```bash
npm test
```

Correr lint:

```bash
npm run lint
```

Compilar para produccion:

```bash
npm run build
```

Correr Storybook:

```bash
npm run storybook
```
