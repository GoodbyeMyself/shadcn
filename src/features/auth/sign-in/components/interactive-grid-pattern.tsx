import { type SVGProps, useState } from 'react'
import { cn } from '@/lib/utils'

interface InteractiveGridPatternProps extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number]
  squaresClassName?: string
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        'absolute inset-0 h-full w-full border border-white/8 text-white/30',
        className
      )}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              'fill-transparent stroke-current transition-all duration-150 ease-out',
              hoveredSquare === index ? 'fill-white/12' : '',
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}
