import { useEffect, useRef, useState } from 'react'
import { SelectOption } from '../types/SelectOption'
import { SelectProps } from '../types/SelectProps'
import styles from './select.module.scss'

const Select = ({ muliple, value, onChange, options }: SelectProps) => {

  const containerRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => { isOpen ? setHighlightedIndex(-1) : null }, [isOpen])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    muliple ? onChange([]) : onChange(undefined)
  }

  const isOptionSelected = (option: SelectOption) => {
    if (muliple) {
      value?.includes(option) ? styles.selected : ''
    } else {
      value?.value === option.value ? styles.selected : ''
    }
  }

  const isHighlighted = (index: number) => highlightedIndex === index ? styles.highlighted : ''

  const highlightThis = (index: number) => setHighlightedIndex(index)

  const setOption = (option: SelectOption) => {
    if (muliple) {
      if (value.find((o) => o.value === option.value)) {
        onChange(value.filter((o) => o.value !== option.value))
      } else {
          onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      
      if (e.target !== containerRef.current) return null;
      console.log(e.target);
      switch (e.code) {
        case "Enter":
          setIsOpen(previous => !previous)
        break
        case "Space":
          setIsOpen((prev) => { return !prev })
        break
      }
    }
    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    }
  }, [isOpen, options])

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      className={styles.container}>
      <span className={styles.value}>
        {muliple ? (value.map((val) => (
          <button key={val.value} onClick={(e) => {
            e.stopPropagation();
            setOption(val);
          }} className={ styles['option-badge']}>
            {val.label}
            <span className={styles['remove-btn']}>&times;</span>
          </button>
        ))) : value?.label }
      </span>
      <button
        onClick={clearOptions}
        className={styles['clear-btn']}>
        &times;
      </button>
      <div className={styles.divider} />
      <div className={styles.caret} />
      <ul className={`${styles.options} ${isOpen ? styles.shown : ''}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              setOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => highlightThis(index)}
            className={`${styles.option} ${isOptionSelected(option)} ${isHighlighted(index)}`}
            key={option.value}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Select;