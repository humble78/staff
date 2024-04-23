export const useClickOutsideState = () => useState<boolean>('isClickOutside', () => false);
export const useShowGenderState = () => useState<boolean>('showGender', () => false);
export const useRegionsListState = () => useState<boolean>('showRegionsList', () => false);
export const useDistrictsListState = () => useState<boolean>('showDistrictsList', () => false);