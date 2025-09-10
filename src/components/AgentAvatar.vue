<template>
  <div
      :style="{ backgroundColor: bgColor, color: getTextColor(bgColor) }"
      class="w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold select-none border border-[#F9F9F9]"
  >
    {{ displayText }}
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  name: {
    type: [String, Number],
    required: true,
  },
  bgColor: {
    type: String,
    default: "#E0E0E0",
  },
});

const displayText = computed(() => {
  if (typeof props.name === "number") {
    return `+${props.name}`;
  }
  if (!props.name) return "";
  const parts = props.name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts[1]?.[0] || "";
  return (first + last).toUpperCase();
});

function getTextColor(bgColor) {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? '#000000' : '#FFFFFF';
}
</script>
