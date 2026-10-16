"""Present-day reconstruction, not recovered client code.

Synthetic examples only. No Correios/DNE data, Oracle connection or RPA writes.
The order below illustrates the author's recollection, not the original ruleset.
"""
from collections.abc import Callable, Iterable
import re
import unicodedata

import pandas as pd

Rule = Callable[[str], str]


def clean_spaces(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def expand_street_type(value: str) -> str:
    # Expand only at the beginning of a street field, never every R or AV.
    value = re.sub(r"^R\b\.?\s+", "Rua ", value, flags=re.IGNORECASE)
    return re.sub(r"^AV\b\.?\s+", "Avenida ", value, flags=re.IGNORECASE)


def expand_title(value: str) -> str:
    # Context matters: this example handles a title after a recognised type.
    titles = {"dr": "Doutor", "prof": "Professor", "cap": "Capitão"}
    return re.sub(
        r"^(Rua|Avenida)\s+(Dr|Prof|Cap)\b\.?\s+",
        lambda m: f"{m.group(1)} {titles[m.group(2).lower()]} ",
        value,
        flags=re.IGNORECASE,
    )


def compose_rules(rules: Iterable[Rule]) -> Callable[[object], str | None]:
    ordered_rules = tuple(rules)

    def normalize(value: object) -> str | None:
        if value is None or value is pd.NA:
            return None
        if not isinstance(value, str):
            if pd.api.types.is_scalar(value) and bool(pd.isna(value)):
                return None
            raise TypeError("The street field must be text or a missing value")
        result = unicodedata.normalize("NFKC", value)
        for rule in ordered_rules:
            result = rule(result)
        return result or None

    return normalize


normalize_street = compose_rules((clean_spaces, expand_street_type, expand_title))


def demonstrate() -> pd.DataFrame:
    frame = pd.DataFrame({"street_original": [
        "  R.   Dr. Exemplo  ", "Av. Prof. Modelo", "Rua Jardim R. Azul", None,
    ]})
    # Functions are first-class objects: compose them, then pass one to apply.
    # Preserve the input. Normalization is not proof of a correct address.
    frame["street_normalized"] = frame["street_original"].apply(normalize_street)
    return frame


if __name__ == "__main__":
    print(demonstrate().to_string(index=False))
