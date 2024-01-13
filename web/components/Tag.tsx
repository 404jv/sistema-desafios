import { Circle } from "@phosphor-icons/react";

type Props = {
  title: string
}

type ColorCustom = {
  iconColor: string
  text: string
  bgColor: string
}

type ColorMap = {
  [key: string]: ColorCustom;
}

export default function Tag({ title }: Props) {
  const colors: ColorMap = {
    Python: { bgColor: 'bg-green', iconColor: 'rgb(29 186 84)', text: 'text-green' },
    Minecraft: { bgColor: 'bg-red-500', iconColor: 'rgb(239 68 68)', text: 'text-red-500' },
    'Fácil': { bgColor: 'bg-blue', iconColor: 'rgb(0 133 255)', text: 'text-blue' }
  }
  const defaultColor: ColorCustom = {
    bgColor: 'bg-gray-400',
    text: 'text-gray-400',
    iconColor: 'rgb(156 163 175)',
  }
  const color = colors[title] ?? defaultColor

  return (
    <div className={`font-bold flex gap-2 ${color.text}`}>
      <Circle className={`${color.bgColor} rounded-full mt-1`} width={14} height={14} color={color.iconColor} />
      <span>{title}</span>
    </div>
  )
}
