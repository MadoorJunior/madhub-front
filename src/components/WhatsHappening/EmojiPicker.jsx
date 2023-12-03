import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRef } from 'react';
import { useConditionalListener } from '../../hooks/useConditionalListener';
import { useEventListener } from '../../hooks/useEventListener';
export const EmojiPicker = ({ displayPicker, setDisplayPicker, setContent, pickBtn }) => {
    const pickRef = useRef(null)
    const handleKeyDown = e => {
        if (e.key === 'Escape') setDisplayPicker(false);
    }
    const handlePointerDown = e => {
        if (!pickBtn.current?.contains(e.target) && !pickRef.current?.contains(e.target)) {
            setDisplayPicker(false)
        }
    }
    const handleAddEmoji = e => {
        setContent(prev => prev + e.native)
    }
    useConditionalListener('keydown', handleKeyDown, displayPicker)
    useConditionalListener('pointerdown', handlePointerDown, displayPicker)
    return (
        <div ref={pickRef} style={{
            position: 'absolute',
            zIndex: 1111
        }}>
            <Picker
                data={data}
                onEmojiSelect={handleAddEmoji}
                previewPosition={'none'}
                maxFrequentRows={2}
            />
        </div>
    )
}
