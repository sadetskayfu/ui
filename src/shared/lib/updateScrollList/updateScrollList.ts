export const updateScrollList = (index: number, options: HTMLElement[], optionsList: HTMLUListElement | null, minCountOptions: number) => {
    if(!optionsList || index === -1 || options.length < minCountOptions) return

    const focusedOption = options[index];
    const optionsListRect = optionsList.getBoundingClientRect();

    if (focusedOption) {
      const focusedOptionRect = focusedOption.getBoundingClientRect();

      if (focusedOptionRect.bottom > optionsListRect.bottom) {
        optionsList.scrollTop += focusedOptionRect.bottom - optionsListRect.bottom;
      } else if (focusedOptionRect.top < optionsListRect.top) {
        optionsList.scrollTop -= optionsListRect.top - focusedOptionRect.top;
      }
    }
  }