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

const config = useRuntimeConfig();

const tabIndex = ref(0);
const avatar = useAvatar();

const passportDetails = ref<PassportDetails>({
  last_name: '',
  first_name: '',
  middle_name: '',
  birth_date: '',
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

const { status, execute, data } = useAsyncData<{ id: number }>(async () => await $fetch(config.public.apiBaseUrl + '/employee/', {
  method: 'post',
  body: {
    // last_name: passportDetails.value.last_name,
    // first_name: passportDetails.value.first_name,
    // middle_name: passportDetails.value.middle_name,
    // birth_date: passportDetails.value.birth_date,
    // gender: passportDetails.value.gender,
    // series_and_number: passportDetails.value.series_and_number,
    // pinfl: passportDetails.value.pinfl,
    // main_phone: contactDetails.value.main_phone,
    // additional_phone: contactDetails.value.additional_phone,
    // email: contactDetails.value.email,
    // latitude: contactDetails.value.latitude,
    // longitude: contactDetails.value.longitude,
    // region: contactDetails.value.region,
    // district: contactDetails.value.district,
    // mahalla: contactDetails.value.mahalla,
    // street: contactDetails.value.street,
    // apartment: contactDetails.value.apartment,
    ...passportDetails.value,
    ...contactDetails.value,
  }
}));

const formData = new FormData();

const { status: avatarStatus, execute: avatarRequest } = useAsyncData(async () => await $fetch(config.public.apiBaseUrl + `/employee/${data.value?.id}/set-avatar/`, {
  method: 'post',
  body: formData,
}));

const handleReady = async () => {

  await execute();

  console.log(data.value);


  // if (status.value === 'success') {
  //   formData.append('avatar', avatar.value);
  //   await avatarRequest();
  // } else {
  //   alert('something is wrong')
  // };
}

</script>

<style>
html {
  font-size: calc(100vw * 0.012);
}
</style>