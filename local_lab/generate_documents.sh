#!/bin/bash

file_list=()
for item in `ls -1 lab_guide`
do 
    if [[ -d $item ]]; then 
        for file in `ls -1 ${item}/*.md`
        do
            file_list+=("${item}/${file} ")
        done
    fi
done

pandoc ${file_list[@]} -o introduction_to_cybersecurity.pdf \
    --from markdown+yaml_metadata_block+raw_html \
    --table-of-contents \
    --toc-depth 6 \
    --number-sections \
    --top-level-division=chapter \
    --highlight-style breezedark \
    --template eisvogel \
    --listing