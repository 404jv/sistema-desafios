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
  [key: string]: string;
}

export default function Tag({ title }: Props) {
  const colors: ColorMap = {
    Python: '#1DBA54',
    Minecraft: '#61371F',
    'Fácil': '#0085FF',
    'Difícil': '#EF4444',
    'Médio': '#FFA500 ',
    yellow: '#FFFF00',
    Kodu: '#36c7f2',
    Blocos: '#248144',
    Bloco: '#248144',
    Linha: '#bc0341',
    Lua: '#000080',
    Scratch: '#FFFF00',
    Roblox: '#FFF',
  }
  const defaultColor = '#9CA3AF'
  const color = colors[title] ?? defaultColor

  return (
    <div className="font-bold flex gap-1 items-center ml-1">
      <div
        className="rounded-full h-3 w-3"
        style={{ backgroundColor: color }}
      ></div>
      <span style={{ color: color }}>{title}</span>
    </div>
  )
}
 