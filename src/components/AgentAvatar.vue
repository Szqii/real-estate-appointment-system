<template>
  <div
      class="w-10 h-10 flex items-center justify-center rounded-full text-black text-sm font-semibold select-none border border-[#F9F9F9]"
      :class="bgClass"
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
});

const bgColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

function stringToHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

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

const bgClass = computed(() => {
  if (typeof props.name === "number") {
    return "bg-gray-300";
  }
  const hash = stringToHash(props.name);
  return bgColors[hash % bgColors.length];
});
</script>
