"""Extract the published menu table from retro-korolev.ru/menu.html.

Usage: curl -Ls https://retro-korolev.ru/menu.html | python3 scripts/extract-retro-menu.py
The output is JSON on stdout. Inspect it before publishing because the source has
occasional formatting and pricing typos.
"""

import argparse
import json
import re
import sys
from datetime import date
from html.parser import HTMLParser
from pathlib import Path


def clean(value):
    value = re.sub(r"\s+", " ", value).strip()
    return (value.replace("Цезарь с креветкам и", "Цезарь с креветками")
                 .replace("Мясо по французки", "Мясо по-французски")
                 .replace("по домашнему", "по-домашнему")
                 .replace("По домашнему", "По-домашнему"))


class MenuTableParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_table = False
        self.in_row = False
        self.in_cell = False
        self.cells = []
        self.chunks = []
        self.heading = False
        self.rows = []

    def handle_starttag(self, tag, attrs):
        if tag == "table" and not self.in_table:
            self.in_table = True
        elif tag == "tr" and self.in_table:
            self.in_row = True
            self.cells = []
            self.heading = False
        elif tag == "td" and self.in_row:
            self.in_cell = True
            self.chunks = []
        elif tag == "h3" and self.in_cell:
            self.heading = True

    def handle_data(self, data):
        if self.in_cell:
            self.chunks.append(data)

    def handle_endtag(self, tag):
        if tag == "td" and self.in_cell:
            self.cells.append(clean(" ".join(self.chunks)))
            self.in_cell = False
        elif tag == "tr" and self.in_row:
            self.rows.append((self.cells, self.heading))
            self.in_row = False
        elif tag == "table" and self.in_table:
            self.in_table = False


arguments = argparse.ArgumentParser()
arguments.add_argument("--out", type=Path, help="Write the extracted JSON to this file")
args = arguments.parse_args()

parser = MenuTableParser()
parser.feed(sys.stdin.read())
sections = []
variant_base = ""
for cells, heading in parser.rows:
    if not cells or not cells[0]:
        continue
    name = cells[0]
    if heading:
        if name == "ПОРЧА ИМУЩЕСТВА":
            break
        sections.append({"title": name, "items": []})
        variant_base = ""
        continue
    if not sections:
        continue
    price = cells[-1].replace(" Р", "").replace(" ₽", "").strip() if len(cells) > 1 else ""
    if price and re.fullmatch(r"[\d.,/\s–-]+", price):
        if name.startswith("—") and variant_base:
            name = f"{variant_base} {name.lstrip('— ').strip()}"
        else:
            variant_base = ""
        # The original menu has a malformed dessert price: 800/1.5200.
        if re.search(r"\.\d{4,}", price):
            price = "Уточнить"
        sections[-1]["items"].append({"name": name, "price": price})
    elif not price and sections[-1]["items"]:
        if name.endswith(":") or ("Хингал" in name and "по-азербайджански" in name):
            variant_base = name.rstrip(": ") + " —"
        else:
            # Some table rows contain only the ingredients of the preceding dish.
            previous = sections[-1]["items"][-1]
            previous["note"] = clean((previous.get("note", "") + " " + name))

if len(sections) < 10 or sum(len(section["items"]) for section in sections) < 150:
    raise SystemExit("Menu extraction looks incomplete; the output was not written.")

output = json.dumps({"source": "https://retro-korolev.ru/menu.html", "checked": date.today().isoformat(), "sections": sections}, ensure_ascii=False, indent=2) + "\n"
if args.out:
    args.out.write_text(output, encoding="utf-8")
else:
    print(output, end="")
