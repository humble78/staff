<template>
  <div class="w-screen h-screen font-montserrat fixed">
    <StageTabs v-model="tabIndex" @click-ready="handleReady">
      <PassportDetails v-model="passportDetails" v-show="tabIndex == 0" />
      <ContactDetails v-model="contactDetails" v-show="tabIndex == 1" />
    </StageTabs>
    <div></div>
  </div>
  <!-- <div @click="clickOutside" :class="{ 'hidden': !isClickOutside }" class="absolute top-0 left-0 h-screen w-screen">
  </div> -->
</template>

<script lang="ts" setup>
const tabIndex = ref(0);

const avatar = useAvatar();

const passportDetails = ref<PassportDetails>({
  last_name: '',
  first_name: '',
  middle_name: '',
  date_birth: '',
  gender: 'Выберите пол',
  series_and_number: '',
  pinfl: '',
});

const contactDetails = ref<ContactDetails>({
  main_phone: '',
  additional_phone: '',
  email: '',
  latitude: 0,
  longitude: 0,
  region: '',
  district: '',
  mahalla: '',
  street: '',
  apartment: '',
});

const { status, execute, data } = useAsyncData<{ id: number }>(async () => await $fetch(process.env + '/employee/', {
  method: 'post',
  body: {
    ...passportDetails,
    ...contactDetails,
  }
}));

const formData = new FormData();

const { status: avatarStatus, execute: avatarRequest } = useAsyncData(async () => await $fetch(process.env + `/employee/${data.value?.id}/set-avatar/`, {
  method: 'post',
  body: formData,
}));

const handleReady = async () => {
  await execute();

  if (status.value === 'success') {
    formData.append('avatar', avatar.value);
    await avatarRequest();
  } else {
    alert('something is wrong')
  };
}

</script>

<style>
html {
  font-size: calc(100vw * 0.012);
}
</style>