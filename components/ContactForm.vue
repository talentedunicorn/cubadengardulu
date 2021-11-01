<template>
  <form>
    <div>
      <label for="fullName">Full name</label>
      <input id="fullName" type="text" required>
    </div>
    <div>
      <label for="email">Email address</label>
      <input id="email" type="email" required>
    </div>
    <div>
      <label for="phone">Phone number (optional)</label>
      <input id="phone" type="tel">
    </div>
    <div>
      <label for="message">Message</label>
      <textarea id="message" rows="3"></textarea>
    </div>
    <button class="button" type="submit" disabled>Submit</button>
  </form>
</template>

<style scoped>
form,
form > div {
  display: flex;
  flex-flow: column;
}

form {
  gap: 2rem;
}

form > div {
  gap: 0.3em;
}

.button {
  flex: 1;
}

@media screen and (min-width: 60rem) {
  form {
    flex-flow: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }
  
  form > * {
    flex: calc((100% / 3) - 2rem);
  }
}
</style>