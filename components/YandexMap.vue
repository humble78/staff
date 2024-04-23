<template>
  <div class="w-full pt-2 space-y-2">
    <label class="relative w-full">
      <span>Геолокация</span>
      <div class="relative h-10 w-full flex items-center">
        <svg class="h-full py-2 px-3 rounded-l-md bg-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
          fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M46.2731 81.0303L44.5772 77.6387C39.0857 66.6474 33.5692 55.9933 26.5026 46.4187C21.9736 40.2688 20.0611 32.673 21.1236 25.0232C22.9194 12.115 33.6274 1.67363 46.594 0.198662C54.8979 -0.776319 63.2269 1.87343 69.4183 7.40243C75.6141 12.9355 79.1681 20.8688 79.1681 29.1686C79.1681 34.681 77.6139 40.0518 74.6723 44.7017L72.2762 48.4724C67.0704 56.6537 61.6876 65.1132 57.3227 73.847L53.7311 81.0303C53.023 82.4428 51.5812 83.3343 50.0021 83.3343C48.423 83.3343 46.9815 82.4428 46.2731 81.0303ZM62.5019 29.1688C62.5019 22.2773 56.8936 16.669 50.0021 16.669C43.1107 16.669 37.5024 22.2773 37.5024 29.1688C37.5024 36.0603 43.1107 41.6686 50.0021 41.6686C56.8936 41.6686 62.5019 36.0603 62.5019 29.1688ZM70.9412 64.234C71.4703 61.9965 73.7202 60.6008 75.9536 61.1424C91.4617 64.8174 99.999 71.2172 99.999 79.1671C99.999 92.8418 74.8454 100 50 100C25.1589 100 0.000976562 92.8418 0.000976562 79.1671C0.000976562 71.2172 8.53831 64.8174 24.0421 61.1424C26.2755 60.6007 28.5254 61.9965 29.0545 64.234C29.5879 66.4714 28.2045 68.7173 25.963 69.2464C13.03 72.3172 8.33421 76.8587 8.33421 79.1671C8.33421 84.1461 24.9546 91.6668 50 91.6668C75.0495 91.6668 91.6658 84.1461 91.6658 79.1671C91.6658 76.8587 86.9741 72.3172 74.0327 69.2464C71.7953 68.7173 70.4078 66.4714 70.9412 64.234Z"
            fill="black" />
        </svg>
        <input class="border px-2 w-full h-full rounded-r-md peer" v-model="search" type="text" list="search"
          placeholder="Начните вводить для поиска" autocomplete="off">
        <datalist id="search">
          <option v-for="(item, index) in searchResponse ?? []" :key="item.geometry?.coordinates.join(',') ?? index"
            :value="item.geometry?.coordinates">
            {{ item.properties.name }} ({{ item.properties.description }})
          </option>
        </datalist>
      </div>
    </label>

    <yandex-map v-model="map" :settings="{
          location: {
            center: selectedSearch ?? [66.975836, 39.654397],
            zoom: zoom,
          },
          className: 'rounded-md border-2 border-gray-400',
          theme: 'light',
          showScaleInCopyrights: true,
        }" width="100%" height="16.4rem">
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-default-marker v-if="selectedSearch" :settings="{ coordinates: selectedSearch }" />
      <yandex-map-listener :settings="{
          onClick: (object, event) => {
            if (map) zoom = map.zoom;

            selectedSearch = event.coordinates;
            longitude = selectedSearch[0];
            latitude = selectedSearch[1];
            search = event.coordinates.toString();
          }
        }" />
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  getBoundsFromCoords,
  getLocationFromBounds,
  YandexMapListener,
} from 'vue-yandex-maps';
import { ref, shallowRef, watch } from 'vue';
import type { SearchResponse } from '@yandex/ymaps3-types/imperative/search';
import type { LngLat, YMap } from '@yandex/ymaps3-types';

const longitude = defineModel<number>('longitude', { required: true });
const latitude = defineModel<number>('latitude', { required: true });

const selectedSearch = ref<LngLat | null>(null);
const search = ref('');
const searchResponse = shallowRef<null | SearchResponse>(null);
const map = shallowRef<YMap | null>(null);
const zoom = ref(12);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

watch(search, async (val) => {
  if (!val) return;

  if (val.split(/[,.]/).length === 4) {
    selectedSearch.value = val.split(',').map((x) => parseFloat(x)) as LngLat;
    return;
  }

  await sleep(300);
  if (val !== search.value) return;

  searchResponse.value = await ymaps3.search({
    text: val,
    bounds: map.value?.bounds,
  });
});

watch([selectedSearch], async () => {
  if (selectedSearch.value) {
    map.value?.setLocation({
      center: selectedSearch.value,
      zoom: 15,
      duration: 300,
    });
  } else if (selectedSearch.value) {
    map.value?.setLocation({
      ...await getLocationFromBounds({
        bounds: getBoundsFromCoords([selectedSearch.value]),
        map: map.value!,
        comfortZoomLevel: true,
      }),
      duration: 300,
    });
  }
});
</script>