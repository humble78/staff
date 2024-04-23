<template>
  <div class="w-full h-full flex justify-center mt-28">
    <div class="w-5/6 h-[33rem]">
      <div class="flex w-full h-10 bg-gray-300 overflow-hidden">
        <span v-for="(item, index) in listTitles" :key="index"
          :class="{ 'bg-indigo-800 after:border-l-indigo-800 text-white': index === tabIndex }"
          class="relative text-sm font-medium flex justify-center items-center w-full after:content-[''] after:border-l-[2rem] after:border-solid after:border-y-[1.25rem] after:border-transparent after:absolute after:top-0 after:-right-4">
          {{ item }}
        </span>
      </div>
      <div class="relative w-full h-full bg-gray-100">
        <slot />
        <div class="absolute bottom-0 right-0 mr-4 mb-4 flex gap-8">
          <button v-show="tabIndex !== 0 && tabIndex !== 3" @click="clickBack"
            class="py-3 px-5 flex items-center text-white bg-indigo-800 hover:bg-indigo-900" type="button">
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 84" fill="none">
              <path
                d="M1.59837 46.2889L37.7119 82.4033C38.7428 83.4342 40.1168 84 41.5818 84C43.0484 84 44.4216 83.4333 45.4525 82.4033L48.7313 79.1236C49.7614 78.0944 50.3289 76.7196 50.3289 75.2537C50.3289 73.7887 49.7614 72.3676 48.7313 71.3383L27.6632 50.2239L94.5976 50.2239C97.6155 50.2239 100 47.8613 100 44.8426V40.2061C100 37.1874 97.6155 34.5866 94.5976 34.5866L27.4242 34.5866L48.7305 13.3542C49.7606 12.3234 50.3281 10.986 50.3281 9.52013C50.3281 8.05591 49.7606 6.69901 48.7305 5.66894L45.4517 2.39987C44.4208 1.36898 43.0476 0.807197 41.581 0.807197C40.1159 0.807197 38.742 1.37629 37.7111 2.40718L1.59756 38.5207C0.564236 39.5548 -0.00404906 40.9353 1.59498e-05 42.4028C-0.00323606 43.8751 0.564236 45.2564 1.59837 46.2889Z"
                fill="white" />
            </svg>
            <span class="ml-2 text-sm">Назад</span>
          </button>
          <button v-show="tabIndex !== 3" @click="clickNext"
            class="py-3 px-5 flex items-center text-white bg-indigo-800 hover:bg-indigo-900" type="button">
            <span class="mr-2 text-sm">Дальше</span>
            <svg class="h-3 w-3" viewBox="0 0 200 168" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M196.803 76.2293L124.576 4.00065C122.514 1.93888 119.767 0.807182 116.836 0.807182C113.903 0.807182 111.157 1.94051 109.095 4.00065L102.537 10.5599C100.477 12.6185 99.3423 15.368 99.3423 18.2997C99.3423 21.2298 100.477 24.072 102.537 26.1306L144.674 68.3595H10.8048C4.76907 68.3595 0 73.0846 0 79.122V88.3951C0 94.4324 4.76907 99.634 10.8048 99.634H145.152L102.539 142.099C100.479 144.16 99.3439 146.835 99.3439 149.767C99.3439 152.695 100.479 155.409 102.539 157.469L109.097 164.007C111.158 166.069 113.905 167.193 116.838 167.193C119.768 167.193 122.516 166.055 124.578 163.993L196.805 91.7658C198.872 89.6975 200.008 86.9366 200 84.0016C200.007 81.0569 198.872 78.2944 196.803 76.2293Z"
                fill="white" />
            </svg>
          </button>
          <button v-show="tabIndex === 3" @click="clickReady"
            class="py-3 px-5 flex items-center text-white bg-indigo-800 hover:bg-indigo-900" type="button">
            <span class="text-sm">Готово</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['click-ready']);

const tabIndex = defineModel({ required: true, default: 0 });

const listTitles = [
  'Паспортные данные',
  'Контакные данные',
  'Данные о семье',
  'Дополнительные данные',
];

// const employeeData = ref<Employee>({
//   first_name: '',
//   last_name: '',
//   middle_name: '',
//   birth_date: '',
//   series_and_number: '',
//   pinfl: '',
//   gender: '',
//   main_phone: '',
//   additional_phone: '',
//   email: '',
//   latitude: 0,
//   longitude: 0,
//   district: '',
//   region: '',
//   mahalla: '',
//   street: '',
//   apartment: '',
//   salary: 0,
//   department: '',
// });

const clickNext = () => {
  ++tabIndex.value;
}

const clickBack = () => {
  --tabIndex.value;
}

const clickReady = async () => {
  tabIndex.value = 0;

  emit('click-ready');
}
</script>

<style></style>