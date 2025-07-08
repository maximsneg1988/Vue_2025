<template>
  <form :class="$style.form" @submit.prevent="handleSubmit">
    <h2 :class="$style.heading">Форма пользователя</h2>

    <div :class="$style.field">
      <label>Фамилия:</label>
      <input
        type="text"
        v-model="lastName"
        :class="[$style.input, errors.lastName && $style.error]"
      />
      <span v-if="errors.lastName" :class="$style.errorText">{{ errors.lastName }}</span>
    </div>

    <div :class="$style.field">
      <label>Имя:</label>
      <input
        type="text"
        v-model="firstName"
        :class="[$style.input, errors.firstName && $style.error]"
      />
      <span v-if="errors.firstName" :class="$style.errorText">{{ errors.firstName }}</span>
    </div>

    <div :class="$style.field">
      <label>Телефон:</label>
      <input type="tel" v-model="phone" :class="[$style.input, errors.phone && $style.error]" />
      <span v-if="errors.phone" :class="$style.errorText">{{ errors.phone }}</span>
    </div>

    <div :class="$style.field">
      <label>E-mail:</label>
      <input type="email" v-model="email" :class="[$style.input, errors.email && $style.error]" />
      <span v-if="errors.email" :class="$style.errorText">{{ errors.email }}</span>
    </div>

    <div :class="$style.checkbox">
      <input type="checkbox" v-model="consent" id="consent" />
      <label for="consent">Согласен на обработку персональных данных</label>
    </div>
    <span v-if="errors.consent" :class="$style.errorText">{{ errors.consent }}</span>

    <button type="submit" :class="$style.button" :disabled="loading">
      {{ loading ? 'Отправка...' : 'Отправить' }}
    </button>

    <p v-if="status" :class="$style.status">{{ status }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { UserFormFields, UserFormErrors } from '@/types/UserForm';

const lastName = ref('');
const firstName = ref('');
const phone = ref('');
const email = ref('');
const consent = ref(false);
const loading = ref(false);
const status = ref('');

const errors = ref<UserFormErrors>({});

function validate(): boolean {
  errors.value = {};

  if (!lastName.value.trim()) errors.value.lastName = 'Введите фамилию';
  if (!firstName.value.trim()) errors.value.firstName = 'Введите имя';
  if (!/^\+?[\d\s()-]{7,}$/.test(phone.value)) errors.value.phone = 'Некорректный номер телефона';
  if (!/^\S+@\S+\.\S+$/.test(email.value)) errors.value.email = 'Некорректный e-mail';
  if (!consent.value) errors.value.consent = 'Подтвердите согласие';

  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  loading.value = true;
  status.value = '';

  const data: UserFormFields = {
    lastName: lastName.value,
    firstName: firstName.value,
    phone: phone.value,
    email: email.value,
    consent: consent.value,
  };

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Ошибка сети');

    status.value = 'Данные успешно отправлены!';
  } catch (e) {
    status.value = 'Ошибка отправки. Попробуйте ещё раз.';
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" module>
.form {
  max-width: 400px;
  margin: 15px auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.heading {
  text-align: center;
  margin-bottom: 20px;
  line-height: 50px;
}

.field {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.error {
  border-color: red;
}

.errorText {
  color: red;
  font-size: 12px;
}

.checkbox {
  display: flex;
  flex-direction: row;
  gap: 18px;
  font-size: 14px;
}

.button {
  background: #b15e31;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #944a27;
  }
}

.status {
  margin-top: 12px;
  font-size: 14px;
  color: green;
}
</style>
